import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './authentication-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';

@NgModule({
    imports: [AuthRoutingModule, ReactiveFormsModule, HttpClientModule],
    exports: [],
    declarations: [AuthRoutingModule.components],
    providers: [AuthService],
})
export class AuthenticationModule { }
