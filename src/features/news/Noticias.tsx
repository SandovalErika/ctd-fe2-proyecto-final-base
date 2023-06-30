import React from "react";
import { CardModal } from "./CardModal";
import { CardNew } from "./CardNew";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import { INew } from "./interfaces/noticias.interface";


// PRINCIPIOS SOLID APLICADOS
// Primer principio SOLID, SINGLE RESPONSABILITY para dividir las responsabilidades del componente "Noticias"
//     - El componente NoticiasContainer cumple con este principio al ser responsable de la lógica de obtener y transformar 
//       los datos de noticias. Se encarga de realizar la llamada a obtenerNoticias, normalizar los datos obtenidos y luego 
//       pasarlos al componente Noticias para su presentación.
//     - El componente Noticias tiene la resposabilidad de obtener el listado de noticias.
//     - El componente  CardNew tiene la responsabilidad de mostrar solo una tarjeta de noticia
//     - El componente CardNew tiene la responsabilidad de mostrar el modal de la noticia que puede estar suscripto  o no.
// Extraje las funciones para normalizar las noticias que recibe: capitalizeWords y calculateMinutes en la carpeta utils.

// Cuarto principio SOLID, PRINCIPIO DE SEGREGACION DE LA INTERFAZ, aplicando de manera indirecta el mismo ya que se 
// separa en una carpeta aparte "interfaces" separando de acuerdo a cada componente y realizando en interfaces 
// especializadas de cada funcionalidad.

/**
 * Componente de listado de noticias.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {INoticiasNormalizadas[]} props.noticias - Array de objetos que representan las noticias a mostrar.
 * @param {INoticiasNormalizadas | null} props.modal - Objeto que representa la noticia modal actual o null si no hay ninguna.
 * @param {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>} props.setModal - Función para actualizar la noticia modal.
 * @returns {JSX.Element} - Elemento JSX del listado de las noticias.
 */

const Noticias = ({noticias, modal, setModal}: INew): JSX.Element => {
  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias && noticias.map((notice) => (<CardNew key={notice.id} notice={notice} setModal={setModal}/>) )}
        {modal ? <CardModal modal={modal} setModal={setModal}/> : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
