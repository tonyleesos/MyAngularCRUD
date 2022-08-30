import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from "@angular/forms";
import { PasswordValidator } from '../passwordValidator';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'signup.component.html',
  styleUrls: ['../app.component.css']
})
export class SignupComponent {
  form:FormGroup;
  invalidLoginMessage: any;
  constructor(fb:FormBuilder, private _loginService:LoginService,private _route:ActivatedRoute){
     this.form = fb.group({
        username:['',Validators.required],
        password:['',Validators.compose([Validators.required,PasswordValidator.cannotContainSpace])]
     })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._route.params.subscribe(params=>{
      this.invalidLoginMessage = params["invalidLoginMessage"];
    })
  }

  onSignup(){
      var result = this._loginService.signup(this.form.controls['username'].value,this.form.controls['password'].value);
  }
}
