import {useNavigate} from 'react-router-dom';

const Clientes = ({ cliente, handleEliminar }) => {

  const navigate = useNavigate();

  const { nombre, empresa, email, tel, notas, id } = cliente;

  return (
    <tr className="border-b border-gray-300">
      <td className="p-3">{nombre} </td>
      <td className="p-3">
        <p>
          <span className="text-gray-700 uppercase font-semibold">Email: </span>{" "}
          {email}{" "}
        </p>
        <p>
          <span className="text-gray-700 uppercase font-semibold">Tel: </span>{" "}
          {tel}{" "}
        </p>
      </td>
      <td className="p-3">{empresa} </td>
      <td className="p-3">
        <button
          onClick={() => navigate(`/clientes/${id}`)}
          type="button"
          className="bg-emerald-500 hover:bg-emerald-700 uppercase font-semibold text-white text-xs w-full block p-2"
        >
          Ver 
        </button>

        <button
          onClick={() => navigate(`/clientes/editar/${id}`)}
          type="button"
          className="bg-blue-600 hover:bg-blue-800 uppercase font-semibold text-white text-xs w-full block p-2 mt-3"
        >
          Editar
        </button>

        <button
          onClick={() => handleEliminar (id, nombre)}
          type="button"
          className="bg-red-600 hover:bg-red-800 uppercase font-semibold text-white text-xs w-full block p-2 mt-3"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Clientes;
