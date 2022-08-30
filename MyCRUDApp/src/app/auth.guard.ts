import { Inject, Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private loginService:LoginService,private router:Router) {

  }

  // 路由守護機制
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.loginService.isLoggedIn.pipe(take(1),
                  map((isLoggedIn:boolean)=>{
                      if(!isLoggedIn){
                        // 如果沒有登入
                        this.router.navigate(['/login']);
                        return false
                      }
                      return true
                    }
                  ))
  }
}
