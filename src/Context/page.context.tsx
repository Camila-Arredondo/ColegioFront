import  { FC, ReactNode, createContext, useEffect, useState } from "react";
import axios from 'axios';

const initial: any = {}
const PageContext = createContext(initial);

const PageProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const [datos, setDatos] = useState<any[]>([]);


    const infoCurso = async (busqueda: any) =>{
        var cursoSeleccionado = await axios.post('http://localhost:8080/pac/search', busqueda);
        if(cursoSeleccionado.data){
          setDatos(cursoSeleccionado.data.map((x:any)=>{
            return {
              nombres: x.nombres,
              apellidos: x.apellidos,
              fechaNacimiento: x.fechaNacimiento,
              curso: x.curso,

            }
          }));
        }else{
          setDatos([]);
        }
       

    }


  const data: any = {
    infoCurso
  };
  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
};

export { PageProvider };
export default PageContext;
