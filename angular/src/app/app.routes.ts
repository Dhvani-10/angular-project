import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { AboutComponent } from './about/about.component'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ProjectsComponent } from './projects/projects.component';
import { PublicNewsComponent } from './public-news/public-news.component';
import { EventsComponent } from './events/events.component';
import { AdminHomeComponent } from './admin/adminhome/adminhome.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { ManageComplaintsComponent } from './admin/manage-complaints/manage-complaints.component';
import { CreateNewsComponent } from './admin/create-news/create-news.component';
import { EventManagementComponent } from './admin/event-management/event-management.component';
import { ViewParticipantsComponent } from './admin/view-participants/view-participants.component';

export const routes: Routes = [ 

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'about', component: AboutComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'user', component: UserComponent }, 
  { path: 'service', component: ServicesComponent },
  { path: 'service/:type', component: ServiceDetailsComponent }, 
  { path: 'complaint', component: ComplaintComponent }, 
  { path: 'projects', component: ProjectsComponent },
  { path: 'public-news', component: PublicNewsComponent },
  {path:'events',component:EventsComponent},
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/manage-user', component: ManageUserComponent },
  { path: 'admin/manage-complaints', component: ManageComplaintsComponent },
  { path: 'admin/create-news', component: CreateNewsComponent },
  {path:'admin/events',component:EventManagementComponent},
  {path:'admin/view-participants',component:ViewParticipantsComponent},

  { path: '**', redirectTo: '' }

];