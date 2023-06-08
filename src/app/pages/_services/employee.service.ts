import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployee } from 'src/app/shared/interface';
import { GetSetAuthService } from 'src/app/shared/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeService {
    url: string = environment.url


    constructor(private http: HttpClient, private _auths: GetSetAuthService) { }

    get header() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer<${sessionStorage.getItem('M')}>`
        })
    }

    getEmployees(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(`${this.url}/employees`, { headers: this.header })
    }

}