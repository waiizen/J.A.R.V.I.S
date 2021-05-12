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
    newPayslip.id = 0;
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
