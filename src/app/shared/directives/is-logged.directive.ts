import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appIsLogged]',
})
export class IsLoggedDirective implements OnChanges {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() isLoggedIn = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoggedIn']) this.updateVisibility();
  }

  private updateVisibility() {
    if (this.isLoggedIn) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
