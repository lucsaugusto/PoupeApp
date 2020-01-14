import { ConsultarUsersComponent } from './component/users/consultar-users/consultar-users.component';
import { AlterarUsersComponent } from './component/users/alterar-users/alterar-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './component/contact/contact.component'
import { AboutUsComponent } from './component/about-us/about-us.component';
import { PostsComponent } from './component/posts/posts.component';
import { SignUpComponent } from './component/users/sign-up/sign-up.component';
import { SignInComponent } from './component/users/sign-in/sign-in.component';
import { InserirUsersComponent } from './component/users/inserir-users/inserir-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {path: 'contact', component: ContactComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'alterar-users/:id', component: AlterarUsersComponent},
  {path: 'consultar-users', component: ConsultarUsersComponent},
  {path: 'inserir-users', component: InserirUsersComponent},
  {path: 'remover-users/:id', component: InserirUsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
