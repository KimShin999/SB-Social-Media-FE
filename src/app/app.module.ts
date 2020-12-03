
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarleftComponent } from './navbarleft/navbarleft.component';
import { NewfeedComponent } from './newfeed/newfeed.component';
import { NavbarrightComponent } from './navbarright/navbarright.component';
import { LayoutHomePageComponent } from './layout-home-page/layout-home-page.component';
import { LayoutTimelinePageComponent } from './layout-timeline-page/layout-timeline-page.component';
import { LayoutLoginPageComponent } from './layout-login-page/layout-login-page.component';
import { LayoutRegisterPageComponent } from './layout-register-page/layout-register-page.component';
import { CoverComponent } from './cover/cover.component';
import { PhotoComponent } from './photo/photo.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TimelineProfileComponent } from './timeline-profile/timeline-profile.component';
import { LayoutHomeFriendPageComponent } from './layout-home-friend-page/layout-home-friend-page.component';
import { TimelineFriendProfileComponent } from './timeline-friend-profile/timeline-friend-profile.component';
import { CoverFriendComponent } from './cover-friend/cover-friend.component';
import { AboutFriendComponent } from './about-friend/about-friend.component';
import { PhotoFriendComponent } from './photo-friend/photo-friend.component';
import { FriendOfFriendComponent } from './friend-of-friend/friend-of-friend.component';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarleftComponent,
    NewfeedComponent,
    NavbarrightComponent,
    LayoutHomePageComponent,
    LayoutTimelinePageComponent,
    LayoutLoginPageComponent,
    LayoutRegisterPageComponent,
    CoverComponent,
    PhotoComponent,
    FriendsComponent,
    AboutComponent,
    TimelineProfileComponent,
    LayoutHomeFriendPageComponent,
    TimelineFriendProfileComponent,
    CoverFriendComponent,
    AboutFriendComponent,
    PhotoFriendComponent,
    FriendOfFriendComponent,
    SearchUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
