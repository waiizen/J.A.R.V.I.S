import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {PayslipService} from "../services/PayslipService";

@Component({
  selector: 'app-payslip-view',
  templateUrl: './payslip-view.component.html',
  styleUrls: ['./payslip-view.component.scss']
})
export class PayslipViewComponent implements OnInit {

  payslips: any[];
  payslipSubscription: Subscription;

  constructor(private payslipService: PayslipService) { }

  ngOnInit(): void {
    this.payslipSubscription = this.payslipService.payslipsSubject.subscribe(
      (payslips: any[]) => {
        this.payslips =payslips;
      }
    );
    this.payslipService.emitPayslipSubject();
  }

}
