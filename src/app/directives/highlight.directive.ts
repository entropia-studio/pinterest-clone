import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Image } from '../interfaces/image';
import { User } from '../interfaces/user';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() imageObj: Image;
  @Input() userObj: User;

  constructor(
    private el: ElementRef,    
    ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#efefef');       
    // Target img-buttons div
    if (this.userObj){
      this.el.nativeElement.childNodes[2].style.visibility = 'visible';
    }    
    
  }
    
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    // Target img-buttons div
    if (this.userObj){
      this.el.nativeElement.childNodes[2].style.visibility = 'hidden';
    }    
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;    
  } 

}
