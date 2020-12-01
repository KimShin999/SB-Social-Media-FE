import { NewfeedComponent } from './newfeed/newfeed.component';
import { AboutComponent } from './about/about.component';
import { LayoutHomePageComponent } from './layout-home-page/layout-home-page.component';
import { LayoutRegisterPageComponent } from './layout-register-page/layout-register-page.component';
import { LayoutTimelinePageComponent } from './layout-timeline-page/layout-timeline-page.component';
import { LayoutLoginPageComponent } from './layout-login-page/layout-login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutHomeFriendPageComponent } from './layout-home-friend-page/layout-home-friend-page.component';
import { TimelineFriendProfileComponent } from './timeline-friend-profile/timeline-friend-profile.component';
import { AboutFriendComponent } from './about-friend/about-friend.component';
import { PhotoFriendComponent } from './photo-friend/photo-friend.component';
import { FriendOfFriendComponent } from './friend-of-friend/friend-of-friend.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LayoutLoginPageComponent },
  { path: 'register', component: LayoutRegisterPageComponent },
  { path: 'timeline', component: LayoutTimelinePageComponent },
  { path: 'myfriend', component: LayoutHomeFriendPageComponent,
  children: [
    {
      path:'',
      redirectTo: 'timeline-friend-profile',
      pathMatch: 'full'
    },{
      path:'about',
      redirectTo: 'about-friend',
      pathMatch: 'full'
    },
    {
      path:'photo',
      redirectTo: 'photo-friend',
      pathMatch: 'full'
    },
    {
      path:'friend',
      redirectTo: 'friend-of-friend',
      pathMatch: 'full'
    },
    {
      path: 'timeline-friend-profile', component: TimelineFriendProfileComponent
    },
    {
      path: 'about', component: AboutFriendComponent
    },
    {
      path: 'photo', component: PhotoFriendComponent
    },
    {
      path: 'friend', component: FriendOfFriendComponent
    }
  ]
  },
  { path: 'profile', component: LayoutHomePageComponent,
    children: [
    {
      path: '',
      redirectTo: 'newfeed',
      pathMatch: 'full'
    },
    {
      path: 'newfeed',
      component: NewfeedComponent
    },
    {
      path: 'about',
      component: AboutComponent
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
