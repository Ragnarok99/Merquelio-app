import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AddCardButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full sm:max-w-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
    >
      <div className="flex justify-center items-center h-full">
        <div className="flex gap-2 flex-col">
          <PlusCircleIcon
            className="w-24 h-24 m-auto"
            strokeWidth={0.5}
            strokeOpacity={0.5}
          />
          <span className="text-gray-500 dark:text-gray-400 font-bold text-base">
            Nuevo Carrito
          </span>
        </div>
      </div>
    </button>
  );
};

export default AddCardButton;
