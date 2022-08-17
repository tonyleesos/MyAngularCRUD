import {Injectable} from '@angular/core';
import { authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class LoginService {
  // 表示用戶是否登入
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router:Router,private afFuth:AngularFireAuth){

  }

  // 將 loggedIn公開為Ob觀察服務器訂閱
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string){
    if(username !== '' && password !== ''){
      // 電子郵件與密碼進行登入 登入成功就近'/' 失敗就跳錯訊息
      return this.afFuth.signInWithEmailAndPassword(username,password)
                .then(authState => {
                  console.log("Login-then",authState);
                  this.loggedIn.next(true);
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

  logout(){
      this.loggedIn.next(false);
      this.afFuth.signOut();
      this.router.navigate(['/login']);
  }


}
