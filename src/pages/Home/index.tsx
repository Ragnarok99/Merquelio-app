import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import { Main } from "../../layouts";

const actions = [
  {
    title: "Mercado 100%",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Final de mes",
    href: "#",
    icon: BadgeCheckIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  // {
  //   title: "Schedule a one-on-one",
  //   href: "#",
  //   icon: UsersIcon,
  //   iconForeground: "text-sky-700",
  //   iconBackground: "bg-sky-50",
  // },
  // {
  //   title: "Payroll",
  //   href: "#",
  //   icon: CashIcon,
  //   iconForeground: "text-yellow-700",
  //   iconBackground: "bg-yellow-50",
  // },
  // {
  //   title: "Submit an expense",
  //   href: "#",
  //   icon: ReceiptRefundIcon,
  //   iconForeground: "text-rose-700",
  //   iconBackground: "bg-rose-50",
  // },
  // {
  //   title: "Training",
  //   href: "#",
  //   icon: AcademicCapIcon,
  //   iconForeground: "text-indigo-700",
  //   iconBackground: "bg-indigo-50",
  // },
];

const applicants = [
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    imageUrl:
      "https://ik.imagekit.io/instaleap/d1/stockimages.tiendasd1.com/kobastockimages/IMAGENES/12000208.png?tr=w-259",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    imageUrl:
      "https://ik.imagekit.io/instaleap/d1/stockimages.tiendasd1.com/kobastockimages/IMAGENES/12002333.png?tr=w-259",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  return (
    <Main>
      <div className="flex justify-center items-center">
        <span
          className={classNames(
            "bg-red-50",
            "text-red-700",
            "rounded-lg inline-flex p-1 ring-4 ring-white"
          )}
        >
          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="text-center py-10 px-2 text-xl font-medium">
          Mis carritos de compras
        </h1>
      </div>
      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
              <div className="mt-4 flex-shrink-0">
                <div className="flex overflow-hidden -space-x-2">
                  {applicants.map((applicant) => (
                    <img
                      key={applicant.email}
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white border-[2px] border-gray-500"
                      src={applicant.imageUrl}
                      alt={applicant.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Home;
