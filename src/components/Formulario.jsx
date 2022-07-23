import { useNavigate } from "react-router-dom";
import Alerta from "./Alerta";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre parece muy corto")
      .max(30, "El nombre es muy largo")
      .required("El Nombre es Obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("El Email no es Valido")
      .required("El email es obligatorio"),
    tel: Yup.number()
      .integer("El número no es valido")
      .positive("El número no es valido")
      .typeError("El número no es valido"),
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Registro Editado
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();

      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-semibold text-center mb-5 text-xl uppercase">
        {cliente?.nombre ? "Editar Cliente" : "Agregar cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente.nombre,
          empresa: cliente.empresa,
          email: cliente.email,
          tel: cliente.tel,
          notas: cliente.notas,
        }}
        //Tomar valores iniciales que vengan desde una BD o una API
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          //console.log(data)
          return (
            <Form>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  type="text"
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-200 border border-gray-400 rounded  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Nombre Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre} </Alerta>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  type="text"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-200 border border-gray-400 rounded  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Empresa Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa} </Alerta>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:{" "}
                </label>
                <Field
                  type="email"
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-200 border border-gray-400 rounded  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Email Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email} </Alerta>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="tel">
                  Telefono:{" "}
                </label>
                <Field
                  type="tel"
                  id="tel"
                  className="mt-2 block w-full p-3 bg-gray-200 border border-gray-400 rounded  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Telefono Cliente"
                  name="tel"
                />
                {errors.tel && touched.tel ? (
                  <Alerta>{errors.tel} </Alerta>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  type="notas"
                  id="notas"
                  className="mt-2 block w-full p-3 bg-gray-200 border h-40 border-gray-400 rounded  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Anotaciones"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Guardar Cambios" : "Agregar cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-semibold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {
    nombre: "",
    empresa: "",
    email: "",
    tel: "",
    notas: "",
  },
  cargando: false,
};

export default Formulario;
