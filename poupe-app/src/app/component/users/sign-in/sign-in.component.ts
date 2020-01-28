import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { LoginService } from './../../../service/login.service';
import { Globals } from 'src/app/model/globals';
import { Users } from 'src/app/model/users';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [ Globals ]
})
export class SignInComponent implements OnInit {
  log: boolean;
  private login: Users = new Users();
  private _msgEnvioDados: string = null;
  private _msgErroEmail: string = null;
  private _msgCampoVazio: string = null;
  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
  }

  fazerLogin() {
    if(this.login.email == "" || this.login.senha == ""){
      this._msgCampoVazio = "Atenção! Preencha Todos os campos";
      this._msgErroEmail = "";
      this._msgEnvioDados = "";
    }
    else {
      this._msgCampoVazio = "";
      this.loginService.login(this.login).subscribe((userRes: Users) => {
        this._msgErroEmail = "";
        this._msgEnvioDados = "Sucesso! O usuário existe";
        this.login.email = "";
        this.login.senha = "";
        console.log(`Ok`);
        Globals.user = userRes;
        this.loginService.log.next(true);
        this.router.navigate(['home']);
      },
        error => {
          this._msgErroEmail = "Falha! O usuário não existe";
          this._msgEnvioDados = "";
          this.login.email = "";
          this.login.senha = "";
          console.log(`Erro cod: ${error.status}`);
          this.router.navigate(['login']);
        });
    }
  }

  limpar() {
    if (this._msgErroEmail != "" || this._msgEnvioDados != "" || this._msgCampoVazio != "") {
      this.login.email = "";
      this.login.senha = "";
      this._msgCampoVazio = "";
      this._msgErroEmail = "";
      this._msgEnvioDados = "";
    }
  }
}
