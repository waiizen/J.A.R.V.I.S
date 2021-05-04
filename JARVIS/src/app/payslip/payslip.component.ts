import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  @Input() id: number;
  @Input() date: string;
  @Input() amount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
