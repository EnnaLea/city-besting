import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { HeaderComponent } from './components/home/header/header.component';
import { UsersDetailsComponent } from './components/user/users-details/users-details.component';
import { UsersComponent } from './components/user/users/users.component';
import { PostsComponent } from './components/home/posts/posts.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', loadComponent: ()=> import('./auth/login/login.component').then(m => m.LoginComponent), },
    {path:'register', loadComponent: ()=> import('./auth/register/register.component').then(m => m.RegisterComponent), },
    
    
    {path:'landing', loadComponent: ()=> import('./components/home/landing/landing.component').then(m => m.LandingComponent), canActivate: [authGuard], 
    children:[
        {path:'', loadComponent: ()=> import('./components/user/users/users.component').then(m => m.UsersComponent), },
        {path:'header', loadComponent: ()=> import('./components/home/header/header.component').then(m => m.HeaderComponent), },
        {path:'home', loadComponent: ()=> import('./components/home/home.component').then(m => m.HomeComponent), },
        {path:'users-detail/:id', loadComponent: ()=> import('./components/user/users-details/users-details.component').then(m => m.UsersDetailsComponent) },
        {path:'posts', loadComponent: ()=> import('./components/home/posts/posts.component').then(m => m.PostsComponent) },
        // {path:'comments', loadComponent: ()=> import('./components/comments/comments.component').then(m => m.CommentsComponent) },
        {path:'user-info', loadComponent: ()=> import('./components/user/user-info/user-info.component').then(m => m.UserInfoComponent) },
        {path:'add-user', loadComponent: ()=> import('./components/admin/create-user/create-user.component').then(m => m.CreateUserComponent) },
        {path:'new-post', loadComponent: ()=> import('./components/admin/new-post/new-post.component').then(m => m.NewPostComponent) },
        {path:'user-post', loadComponent: ()=> import('./components/user/user-posts/user-posts.component').then(m => m.UserPostsComponent) },
        {path:'admin-post', loadComponent: ()=> import('./components/admin/admin-post/admin-post.component').then(m => m.AdminPostComponent) },
    ]
},

];
