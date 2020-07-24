import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService) { }
   canActivate()

   {
     console.log('Bool'+!this.authService.isInvalidLogin);
     return Boolean(!this.authService.isInvalidLogin);
  
   }
}
