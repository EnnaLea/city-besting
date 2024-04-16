import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', loadComponent: ()=> import('./components/login/login.component').then(m => m.LoginComponent), },
    {path:'register', loadComponent: ()=> import('./components/register/register.component').then(m => m.RegisterComponent), },
    
    
    {path:'landing', loadComponent: ()=> import('./components/landing/landing.component').then(m => m.LandingComponent), canActivate: [authGuard], 
    children:[
        {path:'', loadComponent: ()=> import('./components/users/users.component').then(m => m.UsersComponent), },
        {path:'home', loadComponent: ()=> import('./components/home/home.component').then(m => m.HomeComponent), },
        {path:'users-detail/:id', loadComponent: ()=> import('./components/users-details/users-details.component').then(m => m.UsersDetailsComponent) },
        {path:'posts', loadComponent: ()=> import('./components/posts/posts.component').then(m => m.PostsComponent) },
        {path:'comments', loadComponent: ()=> import('./components/comments/comments.component').then(m => m.CommentsComponent) },
        {path:'user-info', loadComponent: ()=> import('./components/user-info/user-info.component').then(m => m.UserInfoComponent) },
        {path:'add-user', loadComponent: ()=> import('./components/create-user/create-user.component').then(m => m.CreateUserComponent) },
        {path:'new-post/:id', loadComponent: ()=> import('./components/new-post/new-post.component').then(m => m.NewPostComponent) },
        {path:'user-post', loadComponent: ()=> import('./components/user-posts/user-posts.component').then(m => m.UserPostsComponent) },
    ]
},

];
