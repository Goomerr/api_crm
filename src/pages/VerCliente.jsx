import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState([]);
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;

        const respuesta = await fetch(url);

        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };

    obtenerClientesApi();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No Hay Resultados</p>
  ) : (
    <div >
      <>
        <h1 className="font-black text-4xl text-blue-900">
          Cliente: {cliente.nombre}
        </h1>
        <p>Información del cliente</p>

        {cliente.nombre && (
          <p className="text-gray-600 text-4xl mt-10">
            <span className="uppercase font-semibold text-gray-800">
              Nombre:
            </span>{" "}
            {cliente.nombre}{" "}
          </p>
        )}

        {cliente.email && (
          <p className="text-gray-600 text-2xl mt-4">
            <span className="uppercase font-semibold text-gray-800">
              Nombre:
            </span>{" "}
            {cliente.email}{" "}
          </p>
        )}

        {cliente.tel && (
          <p className="text-gray-600 text-2xl mt-4">
            <span className="uppercase font-semibold text-gray-800">Tel:</span>{" "}
            {cliente.tel}{" "}
          </p>
        )}

        {cliente.empresa && (
          <p className="text-gray-600 text-2xl mt-4">
            <span className="uppercase font-semibold text-gray-800">
              Empresa:
            </span>{" "}
            {cliente.empresa}{" "}
          </p>
        )}

        {cliente.notas && (
          <p className="text-gray-600 text-2xl mt-4">
            <span className="uppercase font-semibold text-gray-800">
              Notas:
            </span>{" "}
            {cliente.notas}{" "}
          </p>
        )}
      </>
    </div>
  );
};

export default VerCliente;
