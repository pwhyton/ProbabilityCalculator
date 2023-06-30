export interface ProbabilityCalculationModel {
    eventA: number;
    eventB:number;
    probabilityCalculationType: ProbabilityCalculationType;
    calculationTypeDisplay: string;
}

export enum ProbabilityCalculationType{
    CombinedWith,
    Either
}