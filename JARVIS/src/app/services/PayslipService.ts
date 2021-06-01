import {Subject} from "rxjs";
import {Payslip} from "../models/payslip.model";
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {Injectable} from "@angular/core";

@Injectable()
export class PayslipService {

  payslipList: Payslip[] = [];

  payslipsSubject = new Subject<Payslip[]>();

  currentUser = firebase.auth().currentUser;

  constructor() {
    this.getPayslipsUid(this.currentUser.uid);
  }

  emitPayslipSubject(){
    this.payslipsSubject.next(this.payslipList);
  }

  getPayslipById(id: number){
    const payslip = this.payslipList.find(
      (s) => {
        return s.id === id;
      }
    );
    return payslip;
  }

  savePayslips(){
    firebase.database().ref('/payslip').set(this.payslipList);
  }

  getPayslips(){
    firebase.database().ref('/payslip').on(
      'value', (data: DataSnapshot) => {
        this.payslipList = data.val() ? data.val() : [];
        this.emitPayslipSubject();
      }
    );
  }

  getPayslipsUid(uid: string){
    firebase.database().ref('/payslip').orderByChild("userId").equalTo(uid).on(
      'value', (data: DataSnapshot) => {
        this.payslipList = data.val() ? data.val() : [];
        this.emitPayslipSubject();
      }
    );
  }

  getSinglePaylsip(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/payslip').orderByChild("id").equalTo(id).once('value').then(
          (data: DataSnapshot) => {
            data.forEach( (o) => resolve(o.val()));
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPayslip(newPayslip: Payslip){
    this.payslipList.push(newPayslip);
    this.savePayslips();
    this.emitPayslipSubject();
  }

  removePayslip(payslip: Payslip){
    if(payslip.photo){
      const storageRef = firebase.storage().refFromURL(payslip.photo);
      storageRef.delete().then(
        () => {
          console.log("Payslip photo removed");
        },
        (error) => {
          console.log("Could not remove payslip photo : " +error);
        }
      );
    }

    const payslipIndexToRemove = this.payslipList.findIndex(
      (PS1) => {
        if(PS1 === payslip){return true;}
      }
    );
    this.payslipList.splice(payslipIndexToRemove, 1);
    this.savePayslips();
    this.emitPayslipSubject();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const filename = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + filename + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Loading");
          },
          (error) => {
            console.log('Loading error : '+error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          })
      }
    );
  }

  toMonthString(month: number) {
    switch (month){
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }

}
