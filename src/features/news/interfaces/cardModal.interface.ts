import { INoticiasNormalizadas } from "./noticiasContainer.interface"

export interface ICardModal {
    modal: INoticiasNormalizadas
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}
