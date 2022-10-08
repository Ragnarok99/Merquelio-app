import { FormProvider, useForm } from "react-hook-form";
import { ProductRowField } from "./components";

interface Props {}

const CreateCartForm = (props: Props) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="pt-8">
        <div className="grid gap-6 mb-4 md:grid-cols-1">
          <div>
            <label
              htmlFor="cart_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nombre del carrito
            </label>
            <input
              type="text"
              id="cart_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mercado para el bebé..."
              {...methods.register("name")}
            />
          </div>
        </div>
        <h3 className="mb-4 text-gray-900 font-semibold">Productos</h3>
        <ProductRowField name="products" />
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Crear carrito
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateCartForm;
