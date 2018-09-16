import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#eceff1');    
    this.el.nativeElement.childNodes[1].style.visibility = 'visible';
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    this.el.nativeElement.childNodes[1].style.visibility = 'hidden';
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;    
  }
}
