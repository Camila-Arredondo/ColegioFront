import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Select } from "../Components/select";
import { useEffect, useState } from "react";
import { TextBoxCurso } from "../Components/TextBox";
import axios from "axios";
import { BtnGuardar } from "../Components/btnGuardar";


export function CrearEstudiante() {
  const navigate = useNavigate();
  const [curso, setCurso] = useState<any[]>([]);
  const location = useLocation();
  const [alumnoId, setAlumnoId] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
       nombre: "",
       apellido: "",
       fechaNacimiento: "",
       cursoid: "",
    },
    validationSchema: Yup.object().shape({
        nombre: Yup.string()
            .nullable()
            .required("El campo es obligatorio"),
        apellido: Yup.string()
            .nullable()
            .required("El campo es obligatorio"),
        fechaNacimiento: Yup.date()
            .nullable()
            .required("El campo es obligatorio"),
        cursoid: Yup.string()
            .nullable( )
            .required("El campo es obligatorio"),
    }),
    validateOnMount: true,
    onSubmit:async (values) => {
      try{
        var todosLosAlumnos = await axios.get("http://localhost:5291/api/Alumno");


        if(alumnoId){
          const alumnoExistente = todosLosAlumnos.data.find(
            (alumno:any) =>
               alumno.nombre.toLowerCase() === values.nombre.toLowerCase() && alumno.apellido.toLowerCase() === values.apellido.toLowerCase() && alumno.id != alumnoId
          );
          if(alumnoExistente){
            alert("El alumno ya existe. Por favor, elija un nombre diferente.");
            return;
          }
          
          var alumnos = await axios.patch(
            "http://localhost:5291/api/Alumno/"+alumnoId,
            formik.values
          );

        }else{
          const alumnoExistente = todosLosAlumnos.data.find(
            (alumno:any) =>
               alumno.nombre.toLowerCase() === values.nombre.toLowerCase() && alumno.apellido.toLowerCase() === values.apellido.toLowerCase()
          );
          if(alumnoExistente){
            alert("El alumno ya existe. Por favor, elija un nombre diferente.");
            return;
          }
          
          var alumnos = await axios.post(
            "http://localhost:5291/api/Alumno",
            formik.values
          );

        }
      
        formik.resetForm();
        navigate("/estudiantes");

      }catch(e: any){
        alert(e.response.data);
      }
    }
});
useEffect(()=>{
  const fetchData = async () => {
    await OrbtenerCursos();
  };
  fetchData();
  const getAlumno = async () =>{
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if(id){
      var alumnoeditar = await axios.get(`http://localhost:5291/api/Alumno/${id}`);
      var fecha = new Date(alumnoeditar.data.fechaNacimiento);
      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      const fechaFormateada = `${año}-${mes}-${dia}`;

      formik.setValues({
        nombre: alumnoeditar.data.nombre,
        apellido: alumnoeditar.data.apellido,
        fechaNacimiento: fechaFormateada,
        cursoid: alumnoeditar.data.cursoid,
      });
      setAlumnoId(id);
    }
  };
  getAlumno();
 
},[]);
const OrbtenerCursos = async () =>{
  var todosCursos = await axios.get("http://localhost:5291/api/Curso");
  todosCursos.data.unshift({id: "", nivel: "", letra: ""});
  setCurso(
    todosCursos.data.map((x: any)=>{
      return {
        label: `${x.nivel}-${x.letra}`,
        value: x.id,
        ...x
      }
    })
  )
}
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 bg-gray-200">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Datos alumno nuevo
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ingrese los datos del alumno
            </p>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit(e);}}>
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <TextBoxCurso titulo="Nombre" type="text" formik={formik} name="nombre" />
                </div>

                <div className="sm:col-span-3">
                <TextBoxCurso titulo="Apellido" type="text" formik={formik} name="apellido" />
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                <TextBoxCurso titulo="Fecha de Nacimiento" type="date" formik={formik} name="fechaNacimiento" />
                </div>

                <div className="sm:col-span-2">
                  <Select 
                  titulo="Curso"
                  placeholder="Seleccione un curso"
                  options={curso}
                  formik={formik} 
                  name="cursoid"
                  />
                </div> 
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  navigate("/estudiantes");
                }}
              >
                Cancelar
              </button>
              <BtnGuardar titulo="GuardarAsignatura" type="submit" texto="Guardar"

              />
            </div>
          </form>
        </div>
    </div>
  );
}
