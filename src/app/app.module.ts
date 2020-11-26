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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }