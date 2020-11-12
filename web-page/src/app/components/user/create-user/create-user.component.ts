import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {

    this.userForm = this.formBuilder.group({
      ci: '',
      name: '',
      lastname: '',
      surname: '',
      email: '',
      cellphone: '',
      address: '',
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  createUser(userData) {
    const ci = /^\d{5,7}[\ ]+[A-Za-z]+$/gm;
    const regexAlfabeto = /^[a-zA-Z\ ]+$/gm;
    const regexAlfabeNumericoEspacios = /^[\w\ ]+$/gm;
    const celular = /^\d{5,8}$/gm;
    const correo = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const username = /^[A-Za-z0-9]+$/gm;
    const password = /^.{7,}$/gm;
    

    let ciBad = document.getElementById("ciBad");
    let nameBad = document.getElementById("nameBad");
    let lastnameBad = document.getElementById("lastnameBad");
    let surnameBad = document.getElementById("surnameBad");
    let emailBad = document.getElementById("emailBad");
    let addressBad = document.getElementById("addressBad");
    let cellphoneBad = document.getElementById("cellphoneBad");
    let usernameBad = document.getElementById("usernameBad");
    let passwordBad = document.getElementById("passwordBad");
      
    if(ci.test(userData.ci)){
      ciBad.style.display = "none";
    } else {
      ciBad.style.display = "block";
    }


    if(regexAlfabeto.test(userData.name)){
      nameBad.style.display = "none";
    } else {
      nameBad.style.display = "block";
    }

    if(regexAlfabeto.test(userData.lastname)){
      lastnameBad.style.display = "none";
    } else {
      lastnameBad.style.display = "block";
    }

    if(regexAlfabeto.test(userData.surname)){
      surnameBad.style.display = "none";
    } else {
      surnameBad.style.display = "block";
    }

    if(correo.test(userData.email)){
      emailBad.style.display = "none";
    } else {
      emailBad.style.display = "block";
    }

    if(regexAlfabeNumericoEspacios.test(userData.address)){
      addressBad.style.display = "none";
    } else {
      addressBad.style.display = "block";
    }

    if(celular.test(userData.cellphone)){
      cellphoneBad.style.display = "none";
    } else {
      cellphoneBad.style.display = "block";
    }

    if(username.test(userData.username)){
      usernameBad.style.display = "none";
    } else {
      usernameBad.style.display = "block";
    }

    if(password.test(userData.password)){
      passwordBad.style.display = "none";
    } else {
      passwordBad.style.display = "block";
    }

    


    this.userService.create(userData)
      .subscribe(resp => {
        $('#addEmployeeModal').modal('hide');
        this.router.navigateByUrl('/sample', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      }, err => {
        console.log(err);
      });
  }

}
