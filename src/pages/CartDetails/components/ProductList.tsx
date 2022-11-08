import { v4 } from "uuid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import {
  getShoppingCartById,
  searchShoppingCart,
  updateShoppingCart,
} from "../../../api";
import { Product } from "../../../types";
import { RQQueryKeys } from "../../../constants";
import { groupByStartingLetter } from "../../../utils";

type Props = {
  viewSearch: boolean;
  onViewSearch: (value: boolean) => void;
  onEditCart: () => void;
};

const ProductList = ({ viewSearch, onViewSearch, onEditCart }: Props) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const timeoutRef = useRef<any>();

  const [search, setSearch] = useState("");
  const cart = useQuery(
    [RQQueryKeys.cart, id],
    () => getShoppingCartById(String(id)),
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleSearchProducts = () => {
    onViewSearch(true);
    cartSearch.refetch();
  };

  const cartSearch = useQuery(
    [RQQueryKeys.cartSearchProducts, id],
    () => searchShoppingCart(String(id)),
    {
      enabled: viewSearch,
      refetchOnWindowFocus: false,
    }
  );

  const directory = groupByStartingLetter({
    items: cart.data?.products,
    key: "name",
    search,
  });

  const { reset, getValues, control } = useForm();

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

  return (
    <>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-700 dark:text-white">
          Productos
        </h2>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
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
                className="block h-full w-full rounded-md focus-visible:border-gray-300 dark:bg-slate-900 dark:text-gray-400 dark:border-gray-100 border-gray-300 pl-10 pr-2 sm:text-sm"
                placeholder="Buscar"
                name="search"
                value={search}
                onChange={handleFilter}
              />
            </div>
          </div>
          <button
            disabled={cartSearch.isFetching}
            onClick={handleSearchProducts}
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {cartSearch.isFetching ? (
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
                <span>Loading...</span>
              </>
            ) : (
              <span>Buscar carrito</span>
            )}
          </button>
        </form>
      </div>
      <nav
        className="flex-1 min-h-0 h-1/2 overflow-y-auto"
        aria-label="Directory"
      >
        {directory &&
          Object.keys(directory).map((letter) => (
            <div key={letter} className="relative">
              <div className="z-10 sticky top-0 border-t border-b border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-slate-900 px-6 py-1 text-sm font-medium text-gray-500 dark:text-gray-200">
                <h3>{letter}</h3>
              </div>
              <ul role="list" className="relative z-0 divide-y divide-gray-500">
                {directory[letter].map((product: Product) => (
                  <li key={product.id}>
                    <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                      <div className="flex-1 min-w-0">
                        <div className="focus:outline-none">
                          <p className="text-sm font-medium text-gray-900">
                            <Controller
                              name={`products.[${product.id}].name`}
                              defaultValue=""
                              control={control}
                              render={({ field: { onChange, ...field } }) => (
                                <input
                                  type="text"
                                  className="outline-none w-full bg-transparent text-gray-700 dark:text-gray-200"
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
      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50">
        {/* TODO: open modal to add/edit products */}
        <button
          onClick={onEditCart}
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <span>Editar carrito</span>
        </button>
      </div>
    </>
  );
};

export default ProductList;
