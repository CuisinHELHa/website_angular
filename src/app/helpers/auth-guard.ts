import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      console.log("logged in");
      return true;
    } else {
      console.log("not logged in");
    }

    this.router.navigate(['']
      , { queryParams: {returnURL : state.url}}
    );
    return false;
  }
}

