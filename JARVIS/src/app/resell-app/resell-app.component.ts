import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopupAddCategory} from "../admin-app/pop-up/popup-add-category";
import {Category} from "../models/category.model";
import {PopupAddVinted} from "./popup/popup-add-vinted";
import {ResellVinted} from "../models/resell-vinted.model";

@Component({
  selector: 'app-resell-app',
  templateUrl: './resell-app.component.html',
  styleUrls: ['./resell-app.component.scss']
})
export class ResellAppComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onNewVinted(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(PopupAddVinted, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        console.log(data);
        //TODO ajouter en bd et en liste
      });
  }

}
