import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProgressBarComponent,
    RegisterComponent,
  ],
  exports: [
    ProgressBarComponent,
    RegisterComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
