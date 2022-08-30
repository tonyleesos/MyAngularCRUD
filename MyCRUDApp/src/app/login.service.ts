import {Injectable} from '@angular/core';
import { authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class LoginService {
  // 表示用戶是否登入
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedInUser: any; // 儲存當前用戶
  UserEmail: any
  // userEmail!: string | null;
  constructor(private router:Router,private afFuth:AngularFireAuth){

  }

  // 將 loggedIn公開為Ob觀察服務器訂閱
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  // 抓取email
  // userEmail(_useremail: any){
  //   this.UserEmail = _useremail;
  //   return _useremail;
  // }

  login(username: string, password: string){
    if(username !== '' && password !== ''){
      // 電子郵件與密碼進行登入 登入成功就近'/' 失敗就跳錯訊息
      return this.afFuth.signInWithEmailAndPassword(username,password)
                .then(authState => {
                  console.log("Login-then",authState);
                  this.loggedIn.next(true);
                  this.loggedInUser = authState.user?.uid;
                  this.UserEmail = authState.user?.email;
                  this.router.navigate(['/']);
                })
                .catch(
                  error=>{
                    this.router.navigate(['login/'+ error.message]);
                    console.log(error);
                  }
                );
    }
    else{
      return false;
    }
  }

  //註冊
  signup(username: string, password: string){
    return this.afFuth.createUserWithEmailAndPassword(username,password).then(
        authState => {
          console.log("signup-then",authState);
          this.loggedIn.next(true);
          this.loggedInUser = authState.user?.uid;
          this.router.navigate(['/']);
        }
    )
    .catch(
        error => {
        var errorMessage = error.message;
        this.router.navigate(['signup/' + error.message]);
        console.log(error);
        }
    );
  }

  // 抓取現在user
  getCurrentUser(){
    return this.afFuth.authState.subscribe(authState => {
        if(authState){
            // this.userEmail(authState.email);
            this.loggedIn.next(true);
            this.loggedInUser = authState.uid;
            this.router.navigate(['/']);
            console.log("logged in as " + authState.uid);
            console.log("logged email is  " + authState.email);
        }
        else{
          this.router.navigate(['login']);
        }
      });
  }

  logout(){
      this.loggedIn.next(false);
      this.afFuth.signOut();
      this.loggedInUser = null;
      this.router.navigate(['/login']);
  }


}
