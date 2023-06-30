import { Injectable } from '@angular/core';
import { ProbabilityCalculationResult } from '../models/probability-calculation-result';
import { ProbabilityCalculationType } from '../models/probability-calculation-model';

@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {

  constructor() { }

  public allCalculations!: ProbabilityCalculationResult[];

  getEnumDisplay(calculationType: ProbabilityCalculationType){
    return ProbabilityCalculationType[calculationType];
  }
}

