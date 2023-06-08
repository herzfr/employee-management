import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin, ResponseLogin } from 'src/app/shared/interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

    url: string = environment.url

    constructor(private http: HttpClient) { }

    login(user: IUserLogin) {
        return this.http.post<any>(`${this.url}/login`, user, { headers: {} })
            .toPromise()
            .then(res => res as ResponseLogin)
    }

}