import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProbabilityService } from './services/probability.service';
import { ProbabilityCalculationResult } from './models/probability-calculation-result';
import { ProbabilityCalculationType } from './models/probability-calculation-model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RunCalculationModalComponent } from './run-calculation-modal/run-calculation-modal.component';
import PROBABILITY_TYPES from 'src/app/constants/ProbabilityTypes';
import ENDPOINTS_TO_EXPORT from './constants/APIEndpoints';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProbabilityCalculatorClient';

  modalOptions: NgbModalOptions = {
    size: 'lg'
  };

  constructor(private httpClient: HttpClient, public probabilityService: ProbabilityService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.httpClient.get<ProbabilityCalculationResult[]>(ENDPOINTS_TO_EXPORT.GET_ALL_CALCULATIONS)
      .subscribe(response => {
        this.probabilityService.allCalculations = response;
        console.log(this.probabilityService.allCalculations);
      })
  }

  onBtnRunCalcClicked(){
    this.modalService.open(RunCalculationModalComponent, this.modalOptions);
  }

  getEnumDisplay(calculationType: ProbabilityCalculationType){
    return PROBABILITY_TYPES[calculationType].Value;
  }
}
