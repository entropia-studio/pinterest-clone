import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data.image.likes){      
      data.image.likes = [];
    }
  }

  ngOnInit() {       
  }

  closeDialog(): void{    
    this.dialogRef.close();    
  }

}
