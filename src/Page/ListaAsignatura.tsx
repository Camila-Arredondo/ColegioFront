import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextBoxCurso } from "../Components/TextBox";
import { BtnGuardar } from "../Components/btnGuardar";
import axios from "axios";
import { useEffect, useState } from "react";

export function ListaAsignatura() {
  const navigate = useNavigate();

  const [listaAsignatura, setListaAsignatura] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      nombre: "",
    },
    validationSchema: Yup.object().shape({
      nombre: Yup.string().nullable().required("El campo es obligatorio"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        var asignatura = await axios.post(
          "http://localhost:5291/api/Asignatura",
          formik.values
        );
        setListaAsignatura([...listaAsignatura, asignatura.data]);
      } catch (e: any) {
        alert(e.response.data);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await ObtenerListaAsignaturas();
    };
    fetchData();
  }, []);

  const ObtenerListaAsignaturas = async () => {
    var todasAsignaturas = await axios.get(
      "http://localhost:5291/api/Asignatura"
    );
    setListaAsignatura(
      todasAsignaturas.data.map((x: any) => {
        return {
          label: x.nombre,
          value: x.id,
          ...x,
        };
      })
    );
  };

  const eliminarAsignatura = async (id: any) => {
    var asignaturaEliminar = await axios.delete(
      `http://localhost:5291/api/Asignatura/${id}`
    );
    ObtenerListaAsignaturas();
  };

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
              navigate("/");
            }}
          >
            Volver
          </button>
        </div>
      </div>

      <div>
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Ingresar una nueva asignatura.
            </h3>

            <form
              className="mt-5 sm:flex sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <TextBoxCurso
                titulo="Nombre Asignatura"
                type="text"
                formik={formik}
                name="nombre"
              />

              <BtnGuardar
                titulo="GuardarAsignatura"
                type="submit"
                texto="Crear"
              />
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
                      Asignatura
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {listaAsignatura.map((asignaturasAll: any, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {asignaturasAll.nombre}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a className="text-indigo-600 hover:text-indigo-900 px-3">
                          Editar<span className="sr-only"></span>
                        </a>
                        <BtnGuardar
                          titulo="eliminarAsignatura"
                          type="button"
                          texto="Eliminar"
                          onClick={() => {
                            eliminarAsignatura(asignaturasAll.id);
                          }}
                        ></BtnGuardar>
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
