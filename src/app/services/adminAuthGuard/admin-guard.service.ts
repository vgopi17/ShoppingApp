import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService/auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private authService: AuthService) {
    
   }
   canActivate()
   {
     console.log('Admin guard'+this.authService.isAdmin);
     return Boolean(this.authService.isAdmin);
   }
}
