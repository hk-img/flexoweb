import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactFormComponent } from './contact-form.component';

const routes: Routes = [
  { path: '', component: ContactFormComponent },
  { path: ':city', component: ContactFormComponent },
  { path: ':city/:area', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactFormRoutingModule { }
