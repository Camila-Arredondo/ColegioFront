import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextBoxCurso } from "../Components/TextBox";
import { BtnGuardar } from "../Components/btnGuardar";
import axios from "axios";
import { useEffect, useState } from "react";

export function CrearCurso() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<any[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      nivel: "",
      letra: "",
    },
    validationSchema: Yup.object().shape({
      nivel: Yup.number()
        .nullable()
        .min(0, "El nivel debe estar entre 0 y 12")
        .max(12, "El nivel debe estar entre 0 y 12")
        .required("El campo es obligatorio"),
      letra: Yup.string().nullable().required("El campo es obligatorio"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {

        if (cursoSeleccionado) {
          var curso = await axios.patch(
            "http://localhost:5291/api/Curso/" + cursoSeleccionado.id,
            formik.values
          );
          setCursos([...cursos, curso.data]);
          formik.resetForm();
          alert("Curso editado correctamente");
        } else {
          debugger;
          const cursoExistente = cursos.find(
            (curso) =>
              curso.nivel == values.nivel &&
              curso.letra.toLowerCase() == values.letra.toLowerCase()
           
          );
  
          if (cursoExistente) {
            alert(
              "El curso ya existe. Por favor, elija un nivel y letra diferentes."
            );
            return;
          }
          var curso = await axios.post(
            "http://localhost:5291/api/Curso",
            formik.values
          );
          setCursos([...cursos, curso.data]);
          formik.resetForm();
          alert("Curso creado correctamente");
        }
        await listadoCursos();
        setCursoSeleccionado(null);
      } catch (e: any) {
        alert(e.response.data);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await listadoCursos();
    };
    fetchData();
  }, []);

  const listadoCursos = async () => {
    var todosLosCursos = await axios.get("http://localhost:5291/api/Curso");
    setCursos(todosLosCursos.data);
  };

  const eliminarCurso = async (id: any) => {
    var cursoEliminar = await axios.delete(
      `http://localhost:5291/api/Curso/${id}`
    );
    listadoCursos();
  };

  const editarCurso = async (datos: any) => {
    formik.setValues({
      nivel: datos.nivel,
      letra: datos.letra,
    });
    setCursoSeleccionado(datos);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Colegio NOMBRECOLEGIO
          </h1>
          <p className="mt-2 text-sm text-gray-700">Listado cursos actuales.</p>
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

            <form
              className="mt-5 sm:flex sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <TextBoxCurso
                mask="99"
                titulo="Número de curso"
                type="text"
                formik={formik}
                name="nivel"
              />
              <TextBoxCurso
                titulo="Letra"
                type="text"
                formik={formik}
                name="letra"
              />
              <BtnGuardar titulo="GuardarCurso" type="submit" texto="Guardar" />
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
                  {cursos.map((curso: any, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {curso.nivel}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {curso.letra}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <BtnGuardar
                          titulo="editarCurso"
                          type="button"
                          texto="Editar"
                          onClick={() => {
                            editarCurso(curso);
                          }}
                        ></BtnGuardar>

                        <a
                          className="text-indigo-600 hover:text-indigo-900 px-3"
                          onClick={() => {
                            navigate("/estudiantes");
                          }}
                        >
                          Ver curso<span className="sr-only"></span>
                        </a>

                        <BtnGuardar
                          titulo="eliminarCurso"
                          type="button"
                          texto="Eliminar"
                          onClick={() => {
                            eliminarCurso(curso.id);
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
