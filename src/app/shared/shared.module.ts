import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProgressBarComponent,
  ],
  exports: [
    ProgressBarComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
