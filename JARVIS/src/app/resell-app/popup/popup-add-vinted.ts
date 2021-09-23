import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface DialogData{
  name: string;
}

@Component({
  selector: 'popup-add-vinted',
  templateUrl: 'popup-add-vinted.html',
})
export class PopupAddVinted {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PopupAddVinted>,
    public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      buyPrice: ['', Validators.required],
      sellPrice: ['', Validators.required],
      buyDate: ['', Validators.required],
      publishDate: ['', Validators.required],
      sellDate: ['', Validators.required]
    });

  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close(this.form.value);
  }

}
