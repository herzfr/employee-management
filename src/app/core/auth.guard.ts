import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GetSetAuthService } from '../shared/service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private _authservice: GetSetAuthService, private _router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let path = segments.map(m => m.path == 'login')[0]
        if (path && this._authservice.isLogin) {
            this._router.navigate(['/home']);
            return false
        }
        return true
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._authservice.isLogin) return true
        this._router.navigate(['/Login']);
        return false;
    }


}