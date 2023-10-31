import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const people = [
  { curso: 4, letra: "medio A" },
  // More people...
];

export function CrearCurso() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
       nivel: "",
       letra: "",
    },
    validationSchema: Yup.object().shape({
        nivel: Yup.string()
            .nullable()
            .email("Correo Invalido")
            .required("El campo es obligatorio"),
        letra: Yup.string()
            .nullable()
            .required("El campo es obligatorio"),
    }),
    validateOnMount: true,
    onSubmit: (values) => {

    }
});









  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Colegio Ahi te voy San Pedro
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado cursos del colegio.
          </p>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              navigate("/listaasignatura");
            }}
          >
            Ver Asignaturas
          </button>
        </div>
      </div>

      <div>
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Ingresar un nuevo curso
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Ingrese el curso y letra </p>
            </div>
            <form className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="N° curso"
                />
              </div>

              <div className="w-full sm:max-w-xs">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Letra</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Curso
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Letra
                    </th>
                   

                    <th scope="col" className="px-2 py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.curso}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.letra}
                      </td>
                      
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/crearestudiante");
                              }}>
                              Editar<span className="sr-only"></span>
                            </a>
                            <a  className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/estudiantes");
                              }}>
                              Ver curso<span className="sr-only"></span>
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 px-3">
                              Eliminar<span className="sr-only"></span>
                            </a>
                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            


          </div>
        </div>
      </div>
    </div>
  );
}
