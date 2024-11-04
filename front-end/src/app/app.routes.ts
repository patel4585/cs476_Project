import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from "./components/pages/home/home.component";
import { SidebarComponent } from "./components/pages/sidebar/sidebar.component";
import { PostsComponent } from "./components/pages/posts/posts.component";
import { CreatePostComponent } from "./components/pages/create.post/create.post.component";
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProfileComponent } from './components/pages/profile/profile.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'sidebar', component: SidebarComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'create.post', component: CreatePostComponent},
<<<<<<< HEAD
    {path: 'signup', component: SignupComponent},
    {path: 'profile', component: ProfileComponent}
];
=======
    {path: 'signup', component: SignupComponent}
];
>>>>>>> 0993b16d62bcd65379f077413689ed8859852759
