import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { emplyReducer } from '../pages/_ngrx/employee.reducer';
import { EmplyEffects } from '../pages/_ngrx/employee.effects';
import { AuthGuard } from './auth.guard';
import { EmployeeService } from '../pages/_services/employee.service';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        SharedModule,

        StoreModule.forRoot({ emplys: emplyReducer }),
        EffectsModule.forRoot([EmplyEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        StoreRouterConnectingModule.forRoot(),
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthGuard,
        EmployeeService,
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'Core is already loaded. Import it in the AppModule only'
            );
        }
    }

}
