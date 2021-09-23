import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {ResellVinted} from "../models/resell-vinted.model";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ResellVintedService {

  vintedList: ResellVinted[] = [];

  vintedSubject = new Subject<ResellVinted[]>();

  currentUser = firebase.auth().currentUser;

  constructor() {
    //this.getIds();
    this.getVintedUid(this.currentUser.uid);
  }

  emitVintedSubject(){
    this.vintedSubject.next(this.vintedList);
  }

  getIds(){
    firebase.database().ref('/resell-vinted').on(
      'value', (data: DataSnapshot) => {
        this.vintedList = data.val() ? data.val() : [];
        this.emitVintedSubject();
      }
    );
  }

  getVintedUid(uid: string){
    firebase.database().ref('/resell-vinted').orderByChild("userUid").equalTo(uid).on(
      'value', (data: DataSnapshot) => {
        this.vintedList = data.val() ? data.val() : [];
        this.emitVintedSubject();
      }
    );
  }

  getVintedById(id: number){
    const ids = this.vintedList.find(
      (s) => {
        return s.id === id;
      }
    );
    return ids;
  }

  saveVinted(){
    firebase.database().ref('/resell-vinted').set(this.vintedList);
  }

  createNewVinted(newVinted: ResellVinted){
    this.vintedList.push(newVinted);
    this.saveVinted();
    this.emitVintedSubject();
  }

  removeVinted(vinted: ResellVinted){
    const vintedIndexToRemove = this.vintedList.findIndex(
      (PS1) => {
        if(PS1 === vinted){return true;}
      }
    );
    this.vintedList.splice(vintedIndexToRemove, 1);
    this.saveVinted();
    this.emitVintedSubject();
  }

}
