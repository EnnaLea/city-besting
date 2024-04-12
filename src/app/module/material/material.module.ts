import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';





@NgModule({
  declarations: [],
  imports:[],
  exports: [
    CommonModule, FormsModule, MatCardModule, MatGridListModule, MatButtonModule, MatIconModule, MatSidenavModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatSelectModule,
    MatExpansionModule, MatTabsModule
  ]
})
export class MaterialModule { }
