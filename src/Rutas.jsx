import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CrearEstudiante } from "./Page/crearEstudiantes";
import { ListaEstudiantes } from "./Page/ListaAlumnos";
import { CrearAsignatura } from "./Page/crearAsignatura";
import { ListaAsignatura } from "./Page/ListaAsignatura";
import { Notas } from "./Page/notas";

export function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaEstudiantes />}></Route>
        <Route path="/crearEstudiante" element={<CrearEstudiante />}></Route>
        <Route path="/listaAsignatura" element={<ListaAsignatura />}></Route>
        <Route path="/crearAsignatura" element={<CrearAsignatura />}></Route>
        <Route path="/notas" element={<Notas />}></Route>
        

      </Routes>
    </BrowserRouter>
  );
}
