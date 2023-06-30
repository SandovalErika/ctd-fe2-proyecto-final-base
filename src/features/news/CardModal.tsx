import { SuscribeButton } from "./SuscribeButton"
import { CloseButton, ContenedorModal, CotenedorTexto, DescripcionModal, ImagenModal, TarjetaModal, TituloModal } from "./styled"
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { ICardModal } from "./interfaces/cardModal.interface";

/**
 * Componente de la tarjeta modal.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {INoticiasNormalizadas} props.modal - Objeto que representa la noticia modal.
 * @param {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>} props.setModal - Función para actualizar la noticia modal.
 * @returns {JSX.Element} - Elemento JSX de la tarjeta modal.
 */

export const CardModal = ({modal, setModal}: ICardModal): JSX.Element => {
    return (
        <ContenedorModal>
        <TarjetaModal>
          <CloseButton onClick={() => setModal(null)}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={modal.esPremium ? SuscribeImage : modal.imagen} alt= {modal.esPremium ? "news-image" : "mr-burns-excelent"} />
          <CotenedorTexto>
            <TituloModal>{modal.esPremium ? "Suscríbete a nuestro Newsletter" : modal.titulo}</TituloModal>
            <DescripcionModal>
              {modal.esPremium ? "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos" :  modal.descripcion}
            </DescripcionModal>
            {modal.esPremium && <SuscribeButton setModal={setModal} />}
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    )
}