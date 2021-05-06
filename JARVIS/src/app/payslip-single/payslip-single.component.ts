import { Component, OnInit } from '@angular/core';
import {PayslipService} from "../services/PayslipService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payslip-single',
  templateUrl: './payslip-single.component.html',
  styleUrls: ['./payslip-single.component.scss']
})
export class PayslipSingleComponent implements OnInit {

  id: number;
  month: string;
  year: number;
  amount: number;
  company: string;

  constructor(private payslipService: PayslipService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.month = this.payslipService.getPayslipById(+this.id).month;
    this.year = this.payslipService.getPayslipById(+this.id).year;
    this.amount = this.payslipService.getPayslipById(+this.id).amount;
    this.company = this.payslipService.getPayslipById(+this.id).company;
  }

}
