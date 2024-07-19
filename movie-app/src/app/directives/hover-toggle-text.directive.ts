import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHoverToggleText]'
})
export class HoverToggleTextDirective {
  private originalText: string = '𒀭𒉽𒈛';
  private hoverText: string = 'Papsukkal';
  private isOriginal: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.el.nativeElement.innerText = this.originalText;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.toggleText();
    this.renderer.addClass(this.el.nativeElement, 'text-transition');
  }

  private toggleText() {
    if (this.isOriginal) {
      this.el.nativeElement.innerText = this.hoverText;
    } else {
      this.el.nativeElement.innerText = this.originalText;
    }
    this.isOriginal = !this.isOriginal;
  }
}
