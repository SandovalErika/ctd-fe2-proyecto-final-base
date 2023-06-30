import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import Noticias from "./Noticias";
import { INoticiasContainer, INoticiasNormalizadas } from "./interfaces/noticiasContainer.interface";

  /**
 * Componente contenedor de noticias(lógica del componente noticias).
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX del contenedor de noticias.
 */

export const NoticiasContainer = (props: INoticiasContainer ):JSX.Element => {
    const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const ahora = new Date();
        const minutosTranscurridos = Math.floor(
          (ahora.getTime() - n.fecha.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return(
    <Noticias
        {...props}
        noticias ={noticias}
        modal={modal}
        setModal = {setModal}        
    />
  )
}