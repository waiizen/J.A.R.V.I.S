import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayslipService} from "../services/PayslipService";
import {Router} from "@angular/router";
import {Payslip} from "../models/payslip.model";

@Component({
  selector: 'app-payslip-form',
  templateUrl: './payslip-form.component.html',
  styleUrls: ['./payslip-form.component.scss']
})
export class PayslipFormComponent implements OnInit {

  payslipForm: FormGroup;
  fileIsUploading = false;
  fileUploaded = false;
  fileUrl : string;

  month: any[] = [
    {value: 'January', viewValue: 'January'},
    {value: 'February', viewValue: 'February'},
    {value: 'March', viewValue: 'March'},
    {value: 'April', viewValue: 'April'},
    {value: 'May', viewValue: 'May'},
    {value: 'June', viewValue: 'June'},
    {value: 'July', viewValue: 'July'},
    {value: 'August', viewValue: 'August'},
    {value: 'September', viewValue: 'September'},
    {value: 'October', viewValue: 'October'},
    {value: 'November', viewValue: 'November'},
    {value: 'December', viewValue: 'December'}
  ];

  year: any[] = [
    {value: 2017, viewValue: '2017'},
    {value: 2018, viewValue: '2018'},
    {value: 2019, viewValue: '2019'},
    {value: 2020, viewValue: '2020'},
    {value: 2021, viewValue: '2021'},
    {value: 2022, viewValue: '2022'},
    {value: 2023, viewValue: '2023'}
  ];

  constructor(private formBuilder: FormBuilder,
              private payslipService: PayslipService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.payslipForm = this.formBuilder.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      amount: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  onSavePayslip(){
    const newPayslip = new Payslip();
    if(this.payslipService.payslipList.length == 0){
      newPayslip.id = 0;
    } else {
      const max = this.payslipService.payslipList.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current
      })
      newPayslip.id = max.id+1;
    }
    newPayslip.month = this.payslipForm.get('month').value;
    newPayslip.year = this.payslipForm.get('year').value;
    newPayslip.amount = this.payslipForm.get('amount').value;
    newPayslip.company = this.payslipForm.get('company').value;
    if(this.fileUrl && this.fileUrl != ""){
      newPayslip.photo = this.fileUrl;
    }
    this.payslipService.createNewPayslip(newPayslip);
    this.router.navigate(['/payslip']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.payslipService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
