import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrl: './btn-back.component.scss',
})
export class BtnBackComponent {
  private location = inject(Location);

  goToBack(): void {
    this.location.back();
  }
}
