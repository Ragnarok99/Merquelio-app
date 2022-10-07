interface Props {}

const Card = (props: Props) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        <div
          id="dropdown"
          className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: 0,
            transform: "translate(0px, 114px)",
          }}
        >
          <ul className="py-1" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 aspect-auto p-4 rounded-lg shadow-lg"
          src="/pngs/cart.png"
          alt="cart"
        />
        <h5 className="mb-1 text-xl font-semibold text-gray-500 dark:text-gray-400">
          Mercado completo
        </h5>
        <p className="text-sm px-4 text-left text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adiicing elit. Aliquid enim
          veniam natus expedita delectus debitis!
        </p>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
