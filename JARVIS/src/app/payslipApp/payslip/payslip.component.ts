import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PayslipService} from "../../services/PayslipService";
import {Payslip} from "../../models/payslip.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  payslips: Payslip[];
  payslipSubscription: Subscription;

  constructor(private payslipService: PayslipService,
              private router: Router) { }

  ngOnInit(): void {
    this.payslipSubscription = this.payslipService.payslipsSubject.subscribe(
      (payslips: Payslip[]) => {
        this.payslips = payslips;
      }
    );
    this.payslipService.emitPayslipSubject();
  }

  onShow(id: number){
    this.router.navigate(['/payslip/view', id]);
  }

  onDelete(id: number){
    this.payslipService.removePayslip(this.payslipService.getPayslipById(id));
  }

  ngOnDestroy() {
    this.payslipSubscription.unsubscribe();
  }

  onNewPayslip(){
    this.router.navigate(['/payslip', 'new']);
  }

  public get sortData(){
    return this.payslips.sort((a, b) => (a.year < b.year) ? 1 : (a.year === b.year) ? ((a.amount < b.amount) ? 1 : -1) : -1 );
  }

  toMonthString(month: number) {
    switch (month){
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }
}
