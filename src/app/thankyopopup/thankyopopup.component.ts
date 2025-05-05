import { Component, Inject } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-thankyopopup',
  templateUrl: './thankyopopup.component.html',
  styleUrls: ['./thankyopopup.component.css']
})
export class ThankyopopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) {
    this.data = data;
  }

  closeDialog(data: any) {
    this.dialog.closeAll();
  }

}
