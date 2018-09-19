import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Image } from '../interfaces/image';
import { MatDialog } from '@angular/material';
import { ImageComponent } from '../components/image/image.component';


@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() imageObj: Image;

  constructor(
    private el: ElementRef,
    public dialog: MatDialog
    ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#efefef');    
    this.el.nativeElement.childNodes[1].style.visibility = 'visible';
  }
    
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    // Target img-buttons div
    this.el.nativeElement.childNodes[1].style.visibility = 'hidden';
  }

  // Open modal with the image
  @HostListener('click') onMouseClick() {    
    const dialogRef = this.dialog.open(ImageComponent, {      
      data: {image: this.imageObj}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;    
  }

  openImage(image: Image){
    const dialogRef = this.dialog.open(ImageComponent, {      
      data: {image: this.imageObj}
    });
    
  }

}
