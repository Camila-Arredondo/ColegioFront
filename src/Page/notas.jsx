import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Select } from "../Components/select";
import { useEffect, useState } from "react";
import { TextBoxCurso } from "../Components/TextBox";
import axios from "axios";

const people = [
  { asignatura: "Matematicas", Nota1: 3, Nota2: 5.5, Nota3: 4.8, Nota4: 6.1 },
  // More people...
];

export function Notas() {
  const navigate = useNavigate();
  const location = useLocation();
  const [asignatura, setAsignatura] = useState([]);
  const [notasAlumno, setNotasAlumno] = useState([]);

  const formik = useFormik({
    initialValues: {
      nota1: "",
      nota2: "",
      nota3: "",
      nota4: "",
      asignaturaid: "",
    },
    validationSchema: Yup.object().shape({
      nota1: Yup.string().nullable(),
      nota2: Yup.string().nullable(),
      nota3: Yup.string().nullable(),
      nota4: Yup.string().nullable(),
      asignaturaid: Yup.string()
        .nullable()
        .min(1, "El campo es obligatorio")
        .required("El campo es obligatorio"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const idAlumno = searchParams.get("id");
  
        let notas = [];
        if (formik.values.nota1 !== "") {
          notas.push({
            nota: parseFloat(formik.values.nota1),
            alumnoid: idAlumno,
            asignaturaid: formik.values.asignaturaid,
            posicion: 1,
          });
        }
        if (formik.values.nota2 !== "") {
          notas.push({
            nota: parseFloat(formik.values.nota2),
            alumnoid: idAlumno,
            asignaturaid: formik.values.asignaturaid,
            posicion: 2,
          });
        }
        if (formik.values.nota3 !== "") {
          notas.push({
            nota: parseFloat(formik.values.nota3),
            alumnoid: idAlumno,
            asignaturaid: formik.values.asignaturaid,
            posicion: 3,
          });
        }
        if (formik.values.nota4 !== "") {
          notas.push({
            nota: parseFloat(formik.values.nota4),
            alumnoid: idAlumno,
            asignaturaid: formik.values.asignaturaid,
            posicion: 4,
          });
        }

        var crearNotas = await axios.post(
          "http://localhost:5291/api/Notas/"+formik.values.asignaturaid + "/"+idAlumno,
          notas
        );
        setNotasAlumno(crearNotas.data);
        alert("Nota creada correctamente");


        
        await ObtenerNotas();
        formik.resetForm();
      } catch (e) {
        alert(e.response.data);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await ObtenerAsignatura();
    };
    fetchData();
    ObtenerNotas();
  }, []);

  const ObtenerNotas = async () => {
    const searchParams = new URLSearchParams(location.search);
    const idAlumno = searchParams.get("id");

    var todasNotas = await axios.get(`http://localhost:5291/api/Notas/alumno/${idAlumno}`);
    debugger;
    setNotasAlumno(todasNotas.data);
  };

  
  const ObtenerAsignatura = async () => {
    var todasAsignaturas = await axios.get(
      "http://localhost:5291/api/Asignatura"
    );
    setAsignatura(
      todasAsignaturas.data.map((x) => {
        return {
          label: x.nombre,
          value: x.id,
          ...x,
        };
      })
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            NOTAS
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de notas del alumno NOMBRES APELLIDOS.
          </p>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              navigate("/estudiantes");
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
              Ingresar notas
            </h3>

            <form
              className="mt-5 sm:flex sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className=" sm:max-w-xs">
                <TextBoxCurso
                  titulo="Nota 1"
                  type="mask"
                  formik={formik}
                  name="nota1"
                  mask="9.9"
                />
              </div>

              <div className=" sm:max-w-xs">
                <TextBoxCurso
                  titulo="Nota 2"
                  type="mask"
                  formik={formik}
                  name="nota2"
                  mask="9.9"
                />
              </div>

              <div className="w sm:max-w-xs">
                <TextBoxCurso
                  titulo="Nota 3"
                  type="mask"
                  formik={formik}
                  name="nota3"
                  mask="9.9"
                />
              </div>

              <div className=" sm:max-w-xs">
                <TextBoxCurso
                  titulo="Nota 4"
                  type="mask"
                  formik={formik}
                  name="nota4"
                  mask="9.9"
                />
              </div>

              <div className="w-full sm:max-w-xs">
                <Select
                  titulo="Asignatura"
                  placeholder="Seleccione una asignatura"
                  options={asignatura}
                  formik={formik}
                  name="asignaturaid"
                />
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Guardar
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
                      Asignatura
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nota 1
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nota 2
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nota 3
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nota 4
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Promedio
                    </th>

                    <th scope="col" className="px-2 py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {notasAlumno.map((notaAlumnos, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {notaAlumnos.asignatura}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {notaAlumnos?.notas?.find(x=>x.posicion == 1)?.nota}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {notaAlumnos?.notas?.find(x=>x.posicion == 2)?.nota}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {notaAlumnos?.notas?.find(x=>x.posicion == 3)?.nota}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {notaAlumnos?.notas?.find(x=>x.posicion == 4)?.nota}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a className="text-indigo-600 hover:text-indigo-900 px-3" onClick={()=>{
                          formik.setValues({
                            nota1: notaAlumnos.notas.find(x=>x.posicion == 1)?.nota.toString() || "",
                            nota2: notaAlumnos.notas.find(x=>x.posicion ==2)?.nota.toString() || "",
                            nota3:  notaAlumnos.notas.find(x=>x.posicion == 3)?.nota.toString() || "",
                            nota4: notaAlumnos.notas.find(x=>x.posicion == 4)?.nota.toString() || "",
                            asignaturaid: notaAlumnos.asignaturaid,
                          
                          })
                        }}>
                          Editar<span className="sr-only">, </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="justify-end">
              <label
                htmlFor="email"
                className="mt-7 block text-sm font-medium leading-6 text-gray-900"
              >
                Promedio final
              </label>
              <div className="mt-2 ">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-30 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}