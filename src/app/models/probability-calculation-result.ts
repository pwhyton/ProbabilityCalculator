import { ProbabilityCalculationModel } from "./probability-calculation-model";

export interface ProbabilityCalculationResult {
    probability: number;
    calculationDate: Date;
    probabilityCalculationModel: ProbabilityCalculationModel
}
