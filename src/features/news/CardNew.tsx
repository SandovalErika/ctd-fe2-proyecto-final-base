import { ICardNew } from "./interfaces/cardNew.interface"
import { BotonLectura, DescripcionTarjetaNoticia, FechaTarjetaNoticia, ImagenTarjetaNoticia, TarjetaNoticia, TituloTarjetaNoticia } from "./styled"

/**
 * Componente de una tarjeta de noticia.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {INoticiasNormalizadas} props.notice - Objeto que representa la noticia.
 * @param {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>} props.setModal - Función para actualizar la noticia modal.
 * @returns {JSX.Element} - Elemento JSX de la tarjeta de noticia.
 */

export const CardNew = ({notice, setModal}: ICardNew): JSX.Element => {
    return (
        <TarjetaNoticia>
        <ImagenTarjetaNoticia src={notice.imagen} />
        <TituloTarjetaNoticia>{notice.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{notice.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>
          {notice.descripcionCorta}
        </DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => setModal(notice)}>Ver más</BotonLectura>
      </TarjetaNoticia>
    )
}