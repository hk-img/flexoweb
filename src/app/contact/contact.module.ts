import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ContactComponent } from './contact.component';

const routes: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule.forChild(routes)]
})
export class ContactModule {}
