import { Injectable } from '@angular/core';
import {Id} from "../models/id.model";
import {Subject, Subscription} from "rxjs";
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {Payslip} from "../models/payslip.model";

@Injectable({
  providedIn: 'root'
})
export class IdService {

  idsList: Id[] = [];

  idsSubject = new Subject<Id[]>();

  currentUser = firebase.auth().currentUser;

  constructor() {
    //this.getIds();
    this.getIdsUid(this.currentUser.uid);
  }

  emitIdsSubject(){
    this.idsSubject.next(this.idsList);
  }

  getIds(){
    firebase.database().ref('/ids').on(
      'value', (data: DataSnapshot) => {
        this.idsList = data.val() ? data.val() : [];
        this.emitIdsSubject();
      }
    );
  }

  getIdsUid(uid: string){
    firebase.database().ref('/ids').orderByChild("userUid").equalTo(uid).on(
      'value', (data: DataSnapshot) => {
        this.idsList = data.val() ? data.val() : [];
        this.emitIdsSubject();
      }
    );
  }

  getIdsById(id: number){
    const ids = this.idsList.find(
      (s) => {
        return s.id === id;
      }
    );
    return ids;
  }

  saveIds(){
    firebase.database().ref('/ids').set(this.idsList);
  }

  createNewIds(newIds: Id){
    this.idsList.push(newIds);
    this.saveIds();
    this.emitIdsSubject();
  }

  removeIds(ids: Id){
    const payslipIndexToRemove = this.idsList.findIndex(
      (PS1) => {
        if(PS1 === ids){return true;}
      }
    );
    this.idsList.splice(payslipIndexToRemove, 1);
    this.saveIds();
    this.emitIdsSubject();
  }

}
