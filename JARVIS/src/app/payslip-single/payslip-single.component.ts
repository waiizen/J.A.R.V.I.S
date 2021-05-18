import { Component, OnInit } from '@angular/core';
import {PayslipService} from "../services/PayslipService";
import {ActivatedRoute, Router} from "@angular/router";
import {Payslip} from "../models/payslip.model";

@Component({
  selector: 'app-payslip-single',
  templateUrl: './payslip-single.component.html',
  styleUrls: ['./payslip-single.component.scss']
})
export class PayslipSingleComponent implements OnInit {

  payslip: Payslip;

  constructor(private payslipService: PayslipService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.payslip = new Payslip();
    const id = this.route.snapshot.params['id'];
    this.payslipService.getSinglePaylsip(+id).then(
      (payslip: Payslip) => {
        this.payslip = payslip;
      }
    );
  }

}
