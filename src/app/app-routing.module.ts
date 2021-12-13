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
import { Chat2Component } from './chat2/chat2.component';
import { Chat3Component } from './chat3/chat3.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllConvosComponent } from './all-convos/all-convos.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: 'chat2', component: Chat2Component, canActivate: [GuardAuthService] },
  { path: 'chat3', component: Chat3Component, canActivate: [GuardAuthService] },
  { path: 'all-convos', component: AllConvosComponent },
  { path: 'all-posts', component: AllPostsComponent, canActivate: [GuardAuthService] },
  { path: 'all-posts/:category', component: AllPostsComponent, canActivate: [GuardAuthService] },
  { path: 'chat', component: ChatComponent },
  { path: 'post/create', component: PostComponent },
  { path: 'post/edit/:id', component: PostComponent },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'verify/:id', component: VerifyComponent },
  { path: 'verify', component: VerifyComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
