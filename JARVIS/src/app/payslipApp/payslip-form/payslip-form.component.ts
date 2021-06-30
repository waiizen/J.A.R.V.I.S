import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayslipService} from "../../services/PayslipService";
import {Router} from "@angular/router";
import {Payslip} from "../../models/payslip.model";
import firebase from "firebase";

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
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'December'}
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

  currentUser = firebase.auth().currentUser;

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
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      company: ['', Validators.required],
      isPdf: ['']
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
    newPayslip.isPdf = this.payslipForm.get('isPdf').value;
    if(this.fileUrl && this.fileUrl != ""){
      newPayslip.photo = this.fileUrl;
    }
    if(this.currentUser) newPayslip.userId = this.currentUser.uid;
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
