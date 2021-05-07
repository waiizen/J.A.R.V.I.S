import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PayslipService} from "../services/PayslipService";

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  @Input() id: number;
  @Input() month: string;
  @Input() year: string;
  @Input() amount: number;
  @Input() company: string;

  constructor(private payslipService: PayslipService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onShow(id: number){
    this.router.navigate(['/payslip/view', id]);
  }

  onDelete(id: number){

  }

}
