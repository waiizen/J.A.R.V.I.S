import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PayslipService} from "../services/PayslipService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payslip-view',
  templateUrl: './payslip-view.component.html',
  styleUrls: ['./payslip-view.component.scss']
})
export class PayslipViewComponent implements OnInit, OnDestroy {

  payslips: any[];
  payslipSubscription: Subscription;

  constructor(private payslipService: PayslipService,
              private router: Router) { }

  ngOnInit(): void {
    this.payslipSubscription = this.payslipService.payslipsSubject.subscribe(
      (payslips: any[]) => {
        this.payslips =payslips;
      }
    );
    this.payslipService.emitPayslipSubject();
  }

  ngOnDestroy() {
    this.payslipSubscription.unsubscribe();
  }

  onNewPayslip(){
    this.router.navigate(['/payslip', 'new']);
  }

}
