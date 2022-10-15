import { v4 } from "uuid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { groupByStartingLetter } from "../../utils/groupByStartingLetter";
import {
  getShoppingCartById,
  searchShoppingCart,
  updateShoppingCart,
} from "../../api";
import { RQQueryKeys } from "../../constants";
import { Main } from "../../layouts";
import { Controller, useForm } from "react-hook-form";
import { Product } from "../../types";
import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TABS = ["Encontrados", "No encontrados"];

const CartDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [viewSearch, setViewSearch] = useState(false);

  const cart = useQuery([RQQueryKeys.cart, id], () =>
    getShoppingCartById(String(id))
  );

  const cartSearch = useQuery(
    [RQQueryKeys.cartSearchProducts, id],
    () => searchShoppingCart(String(id)),
    {
      enabled: viewSearch,
    }
  );

  const directory = groupByStartingLetter({
    items: cart.data?.products,
    key: "name",
    search,
  });

  const timeoutRef = useRef<any>();

  const { control, reset, getValues } = useForm();

  useEffect(() => {
    reset({
      products: cart.data?.products.reduce(
        (prev: Product, current: Product) => {
          return { ...prev, [current.id]: current };
        },
        {}
      ),
    });
  }, [cart.data]);

  const handleFieldsUpdate = () => {
    const products = getValues("products");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      mutation.mutate({
        data: { name: cart.data.name, products: Object.values(products) },
        cartId: String(id),
      });
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  const mutation = useMutation(updateShoppingCart, {
    onMutate: async (variables) => {
      await queryClient.cancelQueries([RQQueryKeys.carts]);

      const optimisticTodo = {
        id: v4(),
        name: variables.data.name,
        products: variables.data.products,
      };

      queryClient.setQueryData([RQQueryKeys.cart, id], () => optimisticTodo);

      return { optimisticTodo };
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData([RQQueryKeys.carts], (old: any) => result);
      cart.refetch();
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([RQQueryKeys.carts], (old: any) => old);
    },
    retry: 3,
  });

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleSearchProducts = () => {
    setViewSearch(true);
    cartSearch.refetch();
  };
  return (
    <Main>
      <h1 className="text-center py-10 px-2 text-xl font-medium">
        {cart.data?.name}
      </h1>
      <div className="relative z-0 flex flex-1 overflow-hidden">
        {viewSearch && (
          <section className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
            {/* Breadcrumb */}
            {/* <nav
            className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
            aria-label="Breadcrumb"
          >
            <a
              href="#"
              className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
            > */}
            {/* <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            {/* <span>Directory</span>
            </a>
          </nav> */}

            <article>
              {/* Profile header */}
              <div>
                <div>
                  {/* <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" /> */}
                </div>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  <div className="-mt-12 sm:flex sm:items-end sm:space-x-5">
                    <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                        <h1 className="truncate text-2xl font-bold text-gray-900">
                          Resultados
                        </h1>
                      </div>
                      <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                          {/* <EnvelopeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                          <span>Comprar carrito</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">
                      Resultados
                    </h1>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  <nav className="flex space-x-8" aria-label="Tabs">
                    {/* TABS */}

                    <div className="w-full px-2 py-16 sm:px-0">
                      <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                          {TABS.map((category) => (
                            <Tab
                              key={category}
                              className={({ selected }) =>
                                classNames(
                                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                  selected
                                    ? "bg-white shadow"
                                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                )
                              }
                            >
                              {category}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          <Tab.Panel
                            className={classNames(
                              "rounded-xl bg-white p-3",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                          >
                            <div className="grid gap-4 grid-cols-3">
                              {cartSearch?.data?.found?.map(
                                ({ image, name, price }) => (
                                  <div
                                    key={name}
                                    className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm dark:border-gray-700 dark:bg-gray-800"
                                  >
                                    <img
                                      className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg"
                                      src={image}
                                      alt={name}
                                    />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                      <h3 className="font-semibold text-sm tracking-tight text-gray-700 dark:text-white">
                                        {name}
                                      </h3>
                                      <span className="font-normal text-sm text-gray-500 dark:text-gray-400">
                                        precio {price}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                        <Tab.Panel
                          className={classNames(
                            "rounded-xl bg-white p-3",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                          )}
                        >
                          <div className="grid gap-4 grid-cols-1">
                            {cartSearch?.data?.notFound?.map((item) => (
                              <div
                                key={item}
                                className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm dark:border-gray-700 dark:bg-gray-800"
                              >
                                <span className="p-2">{item}</span>
                              </div>
                            ))}
                          </div>
                        </Tab.Panel>
                      </Tab.Group>
                    </div>
                  </nav>
                </div>
              </div>
            </article>
          </section>
        )}
        <aside className="xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-medium text-gray-900">Productos</h2>
            <p className="mt-1 text-sm text-gray-600">
              Busca productos en este carrito
            </p>
            <form className="mt-6 space-y-4">
              <div className="min-w-0 flex-1">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="h-10 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block h-full w-full rounded-md border-gray-300 pl-10 pr-2 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    placeholder="Buscar"
                    name="search"
                    value={search}
                    onChange={handleFilter}
                  />
                </div>
              </div>
              <button
                // disabled={mutation.isLoading}
                onClick={handleSearchProducts}
                type="button"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {false ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Loading...</span>{" "}
                  </>
                ) : (
                  <span>Buscar carrito</span>
                )}
              </button>
            </form>
          </div>
          {/* products list */}
          <nav
            className="flex-1 min-h-0 overflow-y-auto"
            aria-label="Directory"
          >
            {directory &&
              Object.keys(directory).map((letter) => (
                <div key={letter} className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>{letter}</h3>
                  </div>
                  <ul
                    role="list"
                    className="relative z-0 divide-y divide-gray-200"
                  >
                    {directory[letter].map((product: Product) => (
                      <li key={product.id}>
                        <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                          <div className="flex-shrink-0">
                            {/* <img
                            className="h-10 w-10 rounded-full"
                            src={person.imageUrl}
                            alt=""
                          /> */}
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* TODO: change this for a selectable component */}
                            <div className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                              // className="absolute inset-0"
                              // aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                <Controller
                                  name={`products.[${product.id}].name`}
                                  defaultValue=""
                                  control={control}
                                  render={({
                                    field: { onChange, ...field },
                                  }) => (
                                    <input
                                      type="text"
                                      className="outline-none w-full bg-transparent"
                                      onChange={(e) => {
                                        onChange(e);
                                        handleFieldsUpdate();
                                      }}
                                      {...field}
                                    />
                                  )}
                                />
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                <span>Cantidad:</span> {product.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </nav>
        </aside>
      </div>
    </Main>
  );
};

export default CartDetails;
