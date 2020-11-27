import { NewfeedComponent } from './newfeed/newfeed.component';
import { AboutComponent } from './about/about.component';
import { LayoutHomePageComponent } from './layout-home-page/layout-home-page.component';
import { LayoutRegisterPageComponent } from './layout-register-page/layout-register-page.component';
import { LayoutTimelinePageComponent } from './layout-timeline-page/layout-timeline-page.component';
import { LayoutLoginPageComponent } from './layout-login-page/layout-login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LayoutLoginPageComponent },
  { path: 'register', component: LayoutRegisterPageComponent },
  { path: 'timeline', component: LayoutTimelinePageComponent },
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
