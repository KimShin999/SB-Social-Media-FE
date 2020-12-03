import { TimelineProfileComponent } from './timeline-profile/timeline-profile.component';
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
import { SearchUserComponent } from './search-user/search-user.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LayoutLoginPageComponent },
  { path: 'register', component: LayoutRegisterPageComponent },
  {
    path: 'timeline',
    component: LayoutTimelinePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'newfeed',
        pathMatch: 'full',
      },
      {
        path: 'search',
        redirectTo: 'search-user',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchUserComponent,
      },
      {
        path: 'newfeed',
        component: NewfeedComponent,
      },
    ],
  },
<<<<<<< HEAD
  {
    path: 'myfriend/:id',
    component: LayoutHomeFriendPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'timeline-friend-profile',
        pathMatch: 'full',
      },
      {
        path: 'timeline-friend-profile/:id',
        component: TimelineFriendProfileComponent,
      },
      {
        path: 'about',
        component: AboutFriendComponent,
      },
      {
        path: 'photo/:id',
        component: PhotoFriendComponent,
      },
      {
        path: 'friend',
        component: FriendOfFriendComponent,
      },
    ],
=======
  { path: 'myfriend', component: LayoutHomeFriendPageComponent,
  children: [
    {
      path:'',
      redirectTo: 'timeline-friend-profile',
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
>>>>>>> 4eba76be6359c7b65a6c9085caa86b85d7759b5a
  },
  {
    path: 'profile',
    component: LayoutHomePageComponent,
    children: [
    {
      path: '',
      redirectTo: 'newfeed-profile',
      pathMatch: 'full'
    },
    {
      path: 'newfeed-profile',
      component: TimelineProfileComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path:'photo',
       component:PhotoComponent
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
