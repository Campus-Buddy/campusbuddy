import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component'
import { FindABuddyComponent } from './find-a-buddy/find-a-buddy.component';
import { GuardAuthService } from './services/guard-auth.service';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'findbuddy', component: FindABuddyComponent, canActivate: [GuardAuthService], pathMatch: 'full'}, // show all path
  { path: 'findbuddy/:id', component: FindABuddyComponent, canActivate: [GuardAuthService]} // show by tag path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
