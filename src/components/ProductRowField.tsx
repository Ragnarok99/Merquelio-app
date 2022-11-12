import { XCircleIcon } from "@heroicons/react/24/outline";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

const ProductRowField = ({ name }: Props) => {
  const { register } = useFormContext();
  const { fields, remove, append } = useFieldArray({ name });
  return (
    <section className="space-y-4 pb-6">
      {fields.length > 0 ? (
        fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-100"
              >
                Producto {index + 1}
              </label>
              <input
                type="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Arroz..."
                {...register(`${name}.${index}.name`)}
              />
            </div>
            <div className="col-span-3">
              <label
                htmlFor="quatity"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-100"
              >
                Cantidad
              </label>
              <input
                type="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Unidades"
                {...register(`${name}.${index}.quantity`)}
              />
            </div>
            <button
              className="col-span-2 mt-[28px]"
              onClick={() => remove(index)}
            >
              <XCircleIcon
                color="#9f1239"
                strokeWidth={1}
                height={40}
                width={40}
              />
            </button>
          </div>
        ))
      ) : (
        <div>
          <img className="m-auto" src="/pngs/empty-list.png" alt="empty-list" />
          <p className="text-gray-700 dark:text-white w-2/3 m-auto text-center font-semibold">
            Oops! no has agregado productos a tu carrito. :(
          </p>
        </div>
      )}
      <button
        onClick={() => append({ name: "", quantity: 0 })}
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-slate-900 bg-opacity-0 rounded-md group-hover:bg-opacity-0">
          Agregar producto
        </span>
      </button>
    </section>
  );
};

export default ProductRowField;
