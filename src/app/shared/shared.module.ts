import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedDirective } from './directives/is-logged.directive';
import { BtnBackComponent } from './components/btn-back/btn-back.component';

@NgModule({
  declarations: [IsLoggedDirective, BtnBackComponent],
  imports: [CommonModule],
  exports: [IsLoggedDirective, BtnBackComponent],
})
export class SharedModule {}
