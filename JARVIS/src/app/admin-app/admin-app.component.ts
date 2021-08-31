import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from "@angular/material/dialog";
import {PopupAddCategory} from "./pop-up/popup-add-category";
import {Category} from "../models/category.model";
import {PayslipService} from "../services/PayslipService";

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss']
})
export class AdminAppComponent implements OnInit {

  categoryToAdd: Category;

  constructor(public dialog: MatDialog,
              private payslipService: PayslipService) { }

  ngOnInit(): void {
  }

  onNewPayslipCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(PopupAddCategory, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.categoryToAdd = new Category();
        this.categoryToAdd.name = data.name;
        this.payslipService.createNewPayslipCategory(this.categoryToAdd);
      });

  }


}
