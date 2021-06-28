import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase";
import {IdService} from "../../services/id.service";
import {Router} from "@angular/router";
import {Payslip} from "../../models/payslip.model";
import {Id} from "../../models/id.model";

@Component({
  selector: 'app-id-form',
  templateUrl: './id-form.component.html',
  styleUrls: ['./id-form.component.scss']
})
export class IdFormComponent implements OnInit {

  idsForm: FormGroup;

  currentUser = firebase.auth().currentUser;

  constructor(private formBuilder: FormBuilder,
              private idsService: IdService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.idsForm = this.formBuilder.group(
      {
        website: ['', Validators.required],
        login: ['', Validators.required]
      }
    );
  }

  onSaveIds(){
    const newIds = new Id();
    if(this.idsService.idsList.length == 0){
      newIds.id = 0;
    } else {
      const max = this.idsService.idsList.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current
      })
        newIds.id = max.id+1;
    }
    newIds.website = this.idsForm.get('website').value;
    newIds.login = this.idsForm.get('login').value;
    if(this.currentUser) newIds.userUid = this.currentUser.uid;
    this.idsService.createNewIds(newIds);
    this.router.navigate(['/ids']);
  }

}
