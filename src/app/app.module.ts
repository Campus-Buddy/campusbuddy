import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CenterblockComponent } from './components/centerblock/centerblock.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { PostCardComponent } from './components/post-card/post-card.component';

//angular imports

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FindABuddyComponent } from './find-a-buddy/find-a-buddy.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat.service';
import { AllConvosComponent } from './all-convos/all-convos.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeletePostComponent } from './components/delete-post/delete-post.component';
import { Chat2Component } from './chat2/chat2.component';
import { Chat3Component } from './chat3/chat3.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactusComponent,
    HeaderComponent,
    FooterComponent,
    CenterblockComponent,
    UserRegistrationComponent,
    LoginComponent,
    LandingPageComponent,
    LogoutModalComponent,
    FindABuddyComponent,
    UserCardComponent,
    ViewProfileComponent,
    LogoutModalComponent,
    EditProfileComponent,
    ChatComponent,
    AllConvosComponent,
    PostCardComponent,
    AllPostsComponent,
    PostComponent,
    viewAPost,
    PostCardComponent,
    ViewPostComponent,
    NotFoundComponent,
    DeletePostComponent,
    Chat2Component,
    Chat3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    FlexLayoutModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    // NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
    ChatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
