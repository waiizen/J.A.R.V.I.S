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
  isHide = false;

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
    return this.payslips.sort((a, b) => (a.year < b.year) ? 1 : (a.year === b.year) ? ((a.month < b.month) ? 1 : -1) : -1 );
  }

  toMonthString(month: number) {
    return this.payslipService.toMonthString(month);
  }

  onHideAmount(){
    for(let i = 0 ; i < document.getElementsByClassName('tdAmount').length ; i++){
      document.getElementsByClassName('tdAmount')[i].textContent="****,**"+" €";
    }
    this.isHide = true;
  }

  onShowAmount(){

    for(let i = 0 ; i < document.getElementsByClassName('tdAmount').length ; i++){
      document.getElementsByClassName('tdAmount')[i].textContent=this.payslips[i].amount.toString()+" €";
    }

    this.isHide = false;
  }

}
