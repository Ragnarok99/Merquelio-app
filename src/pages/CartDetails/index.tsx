import { Fragment, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";

import {
  getShoppingCartById,
  orderShoppingCart,
  searchShoppingCart,
} from "../../api";
import { RQQueryKeys } from "../../constants";
import { Main } from "../../layouts";
import { EditCartForm, Modal } from "../../components";

import { ProductList } from "./components";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "../../hooks";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TABS = ["Encontrados", "No encontrados"];

const CartDetails = () => {
  const { id } = useParams();
  const [viewSearch, setViewSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState<"home" | "search" | "order">("home");

  // FIXME: add breakpoint this as constant variables
  const isSmallDevice = useMediaQuery("(max-width:768px)");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const handleScreenChange =
    (nextScreen: "home" | "search" | "order") => () => {
      setScreen(nextScreen);
    };

  const cart = useQuery(
    [RQQueryKeys.cart, id],
    () => getShoppingCartById(String(id)),
    {
      refetchOnWindowFocus: false,
    }
  );

  const cartSearch = useQuery(
    [RQQueryKeys.cartSearchProducts, id],
    () => searchShoppingCart(String(id)),
    {
      enabled: viewSearch,
      refetchOnWindowFocus: false,
    }
  );

  // TODO: this should refecth the orders on the future
  const orderMutation = useMutation(orderShoppingCart);

  return (
    <Main>
      <div className="hidden lg:grid grid-cols-3 py-10 px-2">
        <span>lgogo</span>
        <h1 className="text-xl text-center font-medium text-gray-700 dark:text-white">
          {cart.data?.name}
        </h1>
      </div>
      <div className="sticky grid grid-cols-3 items-center top-0 z-10 bg-gray-100 dark:bg-slate-900 dark:text-gray-400 mx-2 lg:hidden">
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="pointer-events-none absolute w-full text-xl text-center font-medium">
          {cart.data?.name}
        </h1>
      </div>
      <div className="flex">
        {((isSmallDevice && screen === "home") || !isSmallDevice) && (
          <aside className="lg:block xl:flex xl:flex-col flex-shrink-0 w-full md:w-96 border-r dark:border-gray-500 border-gray-200">
            <ProductList
              onViewSearch={setViewSearch}
              viewSearch={viewSearch}
              onEditCart={() => setIsOpen(true)}
            />
          </aside>
        )}
        {((isSmallDevice && screen === "search") || !isSmallDevice) && (
          <section className="relative z-0 flex flex-1 overflow-hidden">
            {viewSearch && (
              <div className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                <article>
                  <div>
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <div className="sm:flex sm:items-end sm:space-x-5">
                        <div className="flex mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                            <h1 className="truncate text-2xl font-bold text-gray-700 dark:text-white">
                              Resultados
                            </h1>
                          </div>
                          <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <button
                              type="button"
                              onClick={() => orderMutation.mutate(String(id))}
                              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            >
                              {/* <EnvelopeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                              <span>Comprar carrito</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                        <h1 className="truncate text-2xl font-bold text-gray-700 dark:text-white">
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
                                {
                                  // cartSearch.isRefetching ||
                                  cartSearch.isLoading ? (
                                    <div
                                      role="status"
                                      className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 animate-pulse"
                                    >
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 h-[112px] md:max-w-sm"></div>
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                      {cartSearch?.data?.found?.map(
                                        ({ image, name, price }) => (
                                          <div
                                            key={name}
                                            className="flex items-center bg-white rounded-lg border shadow-md flex-row md:max-w-sm dark:border-gray-700 dark:bg-slate-900"
                                          >
                                            <img
                                              className="object-cover rounded-t-lg h-auto w-24 md:rounded-none md:rounded-l-lg"
                                              src={image}
                                              alt={name}
                                            />
                                            <div className="flex flex-col justify-start w-full md:justify-between p-4 leading-normal">
                                              <h3 className="font-semibold text-sm tracking-tight text-gray-700 dark:text-white">
                                                {name}
                                              </h3>
                                              <span className="font-normal text-sm text-gray-500 dark:text-gray-200">
                                                precio {price}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )
                                }
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
                                    className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm dark:border-gray-700 dark:bg-slate-900"
                                  >
                                    <span className="p-2 text-gray-700 dark:text-gray-200">
                                      {item}
                                    </span>
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
              </div>
            )}
          </section>
        )}
      </div>

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-20 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-lg flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  {/* <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <ProductList
                    onEditCart={() => setIsOpen(true)}
                    viewSearch={viewSearch}
                    onViewSearch={setViewSearch}
                  /> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Modal
        title="Edita tu carrito de compras"
        isOpen={isOpen}
        onClose={onClose}
      >
        <EditCartForm onSuccess={onClose} />
      </Modal>
      <div className="fixed bottom-0 flex h-14 w-full items-center justify-between dark:bg-slate-900 bg-white px-4 dark:text-white text-gray-700 shadow-[0_-2px_3px_rgba(0,0,0,0.6)] shadow-[0_-2px_3px_rgba(0,0,0,0.06)] sm:h-16 md:hidden">
        <button
          onClick={handleScreenChange("home")}
          className={`flex flex-shrink-0 flex-col p-2 w-[36px] items-center justify-center outline-none focus:outline-none ${
            screen === "home" ? "bg-black dark:bg-gray-500 rounded-lg" : ""
          }`}
        >
          <HomeIcon
            strokeWidth={3}
            className={
              screen === "home"
                ? "stroke-white"
                : "stroke-slate-800 dark:stroke-white"
            }
          />
        </button>
        <button
          onClick={handleScreenChange("search")}
          className={`flex flex-shrink-0 flex-col p-2 w-[36px] items-center justify-center outline-none focus:outline-none ${
            screen === "search" ? "bg-black dark:bg-gray-500 rounded-lg" : ""
          }`}
        >
          <MagnifyingGlassIcon
            className={`${
              screen === "search"
                ? "stroke-white fill-white"
                : "stroke-slate-800 dark:stroke-white"
            }`}
          />
        </button>
        <button
          onClick={handleScreenChange("order")}
          className={`flex flex-shrink-0 flex-col p-2 w-[36px] items-center justify-center outline-none focus:outline-none ${
            screen === "order" ? "bg-black dark:bg-gray-500 rounded-lg" : ""
          }`}
        >
          <ShoppingBagIcon
            strokeWidth={3}
            className={
              screen === "order"
                ? "stroke-white"
                : "stroke-slate-800 dark:stroke-white"
            }
          />
        </button>
      </div>
    </Main>
  );
};

export default CartDetails;
