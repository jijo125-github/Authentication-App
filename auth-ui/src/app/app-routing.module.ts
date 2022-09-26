import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditComponent } from './component/edit/edit.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { UploadsComponent } from './component/uploads/uploads.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'edit',  component: EditComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'upload', component: UploadsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
