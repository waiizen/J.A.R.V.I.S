import {Subject} from "rxjs";
import {Payslip} from "../models/payslip.model";
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

export class PayslipService {

  payslipList : Payslip[] = [];

  payslipsSubject = new Subject<any[]>();

  constructor() {
    this.getPayslips();
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

  getSinglePaylsip(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/payslip/'+id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
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

}
