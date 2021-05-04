import {Subject} from "rxjs";

export class PayslipService {

  payslipsSubject = new Subject<any[]>();
  private payslips = [
    {
      id: 0,
      date: 'Jan 2021',
      amount: 660
    },
    {
      id: 1,
      date: 'Feb 2021',
      amount: 963
    }
  ];

  emitPayslipSubject(){
    this.payslipsSubject.next(this.payslips.slice());
  }

}
