import { INoticiasNormalizadas } from "./noticiasContainer.interface";

export interface ICardNew {
    notice: INoticiasNormalizadas,
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}