import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface DialogData{
  name: string;
}

@Component({
  selector: 'popup-add-category',
  templateUrl: 'popup-add-category.html',
})
export class PopupAddCategory {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<PopupAddCategory>,
              public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      name: ['', Validators.required]
    });

  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close(this.form.value);
  }

}
