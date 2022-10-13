import { v4 } from "uuid";
import { ChangeEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { groupByStartingLetter } from "../../utils/groupByStartingLetter";
import { getShoppingCartById, updateShoppingCart } from "../../api";
import { RQQueryKeys } from "../../constants";
import { Main } from "../../layouts";
import { Controller, useForm } from "react-hook-form";
import { Product } from "../../types";

const CartDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery([RQQueryKeys.cart, id], () =>
    getShoppingCartById(String(id))
  );
  const directory = groupByStartingLetter({
    items: data?.products,
    key: "name",
    search,
  });

  const { control, getValues, reset } = useForm();

  useEffect(() => {
    reset({
      products: data?.products.reduce((prev: Product, current: Product) => {
        return { ...prev, [current.id]: current };
      }, {}),
    });
  }, [data]);

  console.log({ values: getValues() });

  const mutate = useMutation(updateShoppingCart, {
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
      refetch();
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([RQQueryKeys.carts], (old: any) => old);
    },
    retry: 3,
  });

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  return (
    <Main>
      <h1 className="text-center py-10 px-2 text-xl font-medium">
        {data?.name}
      </h1>
      <aside className="xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Productos</h2>
          <p className="mt-1 text-sm text-gray-600">
            Busca productos en este carrito
          </p>
          <form className="mt-6 flex space-x-4">
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
                  className="block h-full w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Buscar"
                  name="search"
                  value={search}
                  onChange={handleFilter}
                />
              </div>
            </div>
            {/* <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <FunnelIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="sr-only">Search</span>
            </button> */}
          </form>
        </div>
        {/* Directory list */}
        <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
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
                  {directory[letter].map((product: Product, index) => (
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
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    className="outline-none"
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
    </Main>
  );
};

export default CartDetails;
