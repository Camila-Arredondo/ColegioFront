import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BtnGuardar } from "../Components/btnGuardar";


export function ListaEstudiantes() {
    const location = useLocation();
    const navigate = useNavigate();  
    const [alumnos, setAlumnos] = useState<any[]>([]);

    useEffect(()=>{
      const fetchData = async () => {
        await listadoAlumnos();
      };
      fetchData();
    },[]);
    const listadoAlumnos = async () =>{
      const searchParams = new URLSearchParams(location.search);
    const idCurso = searchParams.get("id");

      var todosLosAlumnos = await axios.get(`http://localhost:5291/api/Alumno/curso/${idCurso}`);
      setAlumnos(todosLosAlumnos.data);
    }
    const eliminarAlumno = async (id: any) => {
      var alumnoEliminar = await axios.delete(
        `http://localhost:5291/api/Alumno/${id}`
      );
      listadoAlumnos();
    }

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
          <div className="mt-7 flow-root">
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
                      {alumnos.map((alumno:any, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {alumno.nombre}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumno.apellido}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumno.fechaNacimiento}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumno.curso.nivel}-{alumno.curso.letra}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                            <a className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/crearestudiante?id="+ alumno.id);
                              }}>
                              Editar<span className="sr-only">, </span>
                            </a>

                            <a  className="text-indigo-600 hover:text-indigo-900 px-3"
                            onClick={() => {
                                navigate("/notas?id="+alumno.id);
                              }}>
                              Ver notas<span className="sr-only">, </span>
                            </a>
                          
                            <BtnGuardar
                          titulo="eliminarAlumno"
                          type="button"
                          texto="Eliminar"
                          onClick={() => {
                            eliminarAlumno(alumno.id);
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
      )
};