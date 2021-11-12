import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FindABuddyComponent } from './find-a-buddy/find-a-buddy.component';
import { GuardAuthService } from './services/guard-auth.service';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ChatComponent } from './chat/chat.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllConvosComponent } from './all-convos/all-convos.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [GuardAuthService] },
  { path: 'about', component: AboutComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'findbuddy', component: FindABuddyComponent, canActivate: [GuardAuthService], pathMatch: 'full' }, // show all path
  { path: 'findbuddy/:id', component: FindABuddyComponent, canActivate: [GuardAuthService] }, // show by tag path
  { path: 'profile', component: EditProfileComponent, canActivate: [GuardAuthService], pathMatch: 'full' },
  { path: 'profile/:id', component: ViewProfileComponent, canActivate: [GuardAuthService] },
  { path: 'chat', component: ChatComponent, canActivate: [GuardAuthService] },
  { path: 'all-convos', component: AllConvosComponent },
  { path: 'all-posts', component: AllPostsComponent, canActivate: [GuardAuthService] },
  { path: 'all-posts/:category', component: AllPostsComponent, canActivate: [GuardAuthService] },
  { path: 'post', component: PostComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'post', component: PostComponent},
  { path: 'post/:id', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
