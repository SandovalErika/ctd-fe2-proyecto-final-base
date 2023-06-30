import { ISuscribeModal } from "./interfaces/suscribeButton.interface";
import { BotonSuscribir } from "./styled";

/**
 * Componente del botón de suscripción.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>} props.setModal - Función para actualizar la noticia modal.
 * @returns {JSX.Element} - Elemento JSX del botón de suscripción.
 */

export const SuscribeButton = ({setModal}: ISuscribeModal): JSX.Element => {
    return (
        <BotonSuscribir
            onClick={() =>
            setTimeout(() => {
                alert("Suscripto!");
                setModal(null);
            }, 1000)}>
        Suscríbete
        </BotonSuscribir>
    )
}
