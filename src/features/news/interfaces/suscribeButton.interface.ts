import { INoticiasNormalizadas } from "./noticiasContainer.interface";

export interface ISuscribeModal {
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}