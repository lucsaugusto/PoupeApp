import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  //Atributos
  novo: boolean = false;
  users: Array<User> = new Array<User>();
  user: User = new User(0, '', '', '', '');
  idUsuario: number;
  showId: boolean
  showAll: boolean

  constructor(private route: ActivatedRoute, private userService: UsersService) { }
  //É chamado assim que baixar todos os componentes e serviços na maquina do usuario;
  ngOnInit() {
    let id:number = this.route.snapshot.params["id"];
    if(id == undefined){
      this.novo = true;
    } else {
      this.btnClickId(id);
      this.novo = false;
    }
  }

  //Começa a minha aplicação
  btnClickAll() {
    this.userService.getAll().subscribe((userOut: User[]) => {
      this.users = userOut;
      this.showId = false;
      this.showAll = true;
    });
  }

  btnClickId(id:number) {
    this.userService.getById(id).subscribe((userOut: User) =>{
      this.user = userOut; 
     }, err => {
       console.log(`Erro cod: ${err.status}`);
     });
    this.userService.getById(id).subscribe((userOut: User) => {
      this.user = userOut;
      this.showId = true;
      this.showAll = false;
    })
  }

  salvar(){
    if(this.novo){
      this.userService.insert(this.user).subscribe((user: User) =>{
        this.user = user;
        this.novo = false;
      });
    } else {
      this.userService.update(this.user).subscribe((user: User) =>{
        this.user = user;
      });
    }
  }

}