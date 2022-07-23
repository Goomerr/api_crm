import { useEffect, useState } from "react";

import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = "http://localhost:4000/clientes/";

        const respuesta = await fetch(url);

        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };

    obtenerClientesApi();
  }, []);

  const handleEliminar = async (id, nombre) => {

    const confirmar = confirm(`¿Deseas Eliminar a ${nombre}? `);

    if(confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`;

        const respuesta = await fetch(url, {
          method:'DELETE'
        });

        await respuesta.json();

        const arrayClientes = clientes.filter(cliente =>  cliente.id !== id);

        setClientes( arrayClientes);
        
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900"> Clientes</h1>
      <p>Administración de clientes</p>
      {cargando ? (
        <Spinner />
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Empresa</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inicio;
