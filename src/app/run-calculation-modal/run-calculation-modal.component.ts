import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import API_ENDPOINTS from 'src/app/constants/APIEndpoints';
import HTTP_OPTIONS from 'src/app/constants/HttpOptions';
import PROBABILITY_TYPES from 'src/app/constants/ProbabilityTypes';
import { ProbabilityCalculationCreateDTO } from '../models/probability-calculation-create-dto-model';
import { ProbabilityService } from '../services/probability.service';
import { ProbabilityCalculationType } from '../models/probability-calculation-model';
import { ProbabilityCalculationResult } from '../models/probability-calculation-result';


@Component({
  selector: 'app-run-calculation-modal',
  templateUrl: './run-calculation-modal.component.html',
  styleUrls: ['./run-calculation-modal.component.css']
})
export class RunCalculationModalComponent {
  formCalc!: FormGroup;
  submitted = false;
  runSuccessful: boolean = false;
  runFailed: boolean = false;
  probabilityCalculationResult!: ProbabilityCalculationResult;
  eventA!: number;
  eventB!: number;
  probabilityCalculationType = ProbabilityCalculationType;
  selectedValue!: number;
  enumKeys: string[] = [];  
  probabilityTypes = PROBABILITY_TYPES;


  constructor(public formBuilder: FormBuilder, private httpClient: HttpClient, public activeModal: NgbActiveModal, private probabilityService: ProbabilityService) {    
    this.formCalc = this.formBuilder.group({
      eventA: ['', [Validators.required, Validators.min(0),Validators.max(1)]],
      eventB: ['', [Validators.required, Validators.min(0),Validators.max(1)]],
      calculationType: ['0', Validators.required]
      
    });
  }

  get f() { return this.formCalc.controls; }

  resetForm() {
    this.submitted = false;
    this.runFailed = false;
    this.runSuccessful = false;
  }

  submitForm() {    
    this.submitted = true;

    if(this.formCalc.invalid){
      return;
    }

    var calcToRun = {} as ProbabilityCalculationCreateDTO;

    calcToRun.eventA = this.formCalc.get('eventA')!.value;
    calcToRun.eventB = this.formCalc.get('eventB')!.value;    
    calcToRun.probabilityCalculationType = parseInt(this.formCalc.get('calculationType')!.value);

    this.httpClient
      .post(API_ENDPOINTS.RUN_CALC, calcToRun, HTTP_OPTIONS)
      .subscribe({
        next: (calculationResult) => {
          this.runSuccessful = true;          
          this.probabilityCalculationResult = calculationResult as ProbabilityCalculationResult;
          this.probabilityService.allCalculations.push(this.probabilityCalculationResult);
          console.log('Successfully ran a calculation: Result was ' + this.probabilityCalculationResult.probability);          
        },
        error: (error: HttpErrorResponse) => {
          this.runFailed = true;
          console.log(`Failed to run calculation : "HTTP statuscode: ${error.status}: ${error.error}"`);
        },
      });
  }
}


