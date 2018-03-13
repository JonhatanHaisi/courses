import { ModelsInterface } from "./ModelsInterfaces";

export interface BaseModelInterface {

    prototype?;

    associate?(models: ModelsInterface): void;

}
