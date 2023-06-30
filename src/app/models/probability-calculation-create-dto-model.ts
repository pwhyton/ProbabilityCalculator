import { ProbabilityCalculationType } from "./probability-calculation-model";

export interface ProbabilityCalculationCreateDTO {
    eventA : number;
    eventB: number;
    probabilityCalculationType: number;
}