import { INoticiasNormalizadas } from "./noticiasContainer.interface";

export interface INew {
    noticias: INoticiasNormalizadas[],
    modal: INoticiasNormalizadas | null,
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
  }