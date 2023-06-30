import React from "react";
import { CardModal } from "./CardModal";
import { CardNew } from "./CardNew";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import { INew } from "./interfaces/noticias.interface";



// Aplicaque el primer principio SOLID, single responsability para liberar al componente "Noticias" de ciertas responsabilidades que no le eran propias.
// En principio extraje las funciones para normalizar las noticias que recibe: capitalizeWords, calculateMinutes y noticias.mapper.
// Por último extraje 3 componentes que pueden ser reutilizados y da más legibilidad al código: ModalPremium, ModalSubscripcion y CardNoticias.

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
