import { useNavigate } from "react-router-dom";

const people = [
    { name: 'Juan Andres', title: 'Ureta Barra', email: '13-03-2010', role: '8 basicoA' },
    // More people...
  ]

export function ListaEstudiantes() {
    const navigate = useNavigate();  



    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">ALUMNOS</h1>
              <p className="mt-2 text-sm text-gray-700">
                Listado de todos los alumnos.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                    navigate("/crearestudiante");
                  }}
              >
                Agregar Alumno
              </button>
            </div>

            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                    navigate("/");
                  }}
              >
                Volver
              </button>
            </div>





          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Nombres
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Apellidos
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Fecha Nacimiento
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Curso
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((person) => (
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/crearestudiante");
                              }}>
                              Editar<span className="sr-only">, {person.name}</span>
                            </a>
                            <a  className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/notas");
                              }}>
                              Ver notas<span className="sr-only">, {person.name}</span>
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 px-3">
                              Eliminar<span className="sr-only">, {person.name}</span>
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
      )
};