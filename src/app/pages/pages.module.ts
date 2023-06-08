import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from './_services/employee.service';
import { HttpClientModule } from '@angular/common/http';
// import { StoreModule } from '@ngrx/store';
// import { emplyReducer } from './_ngrx/employee.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { EmplyEffects } from './_ngrx/employee.effects';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { EmplyRepository } from './_services/employee.repository';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

const routes: Routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'add', component: EmployeeAddComponent },
    { path: ':id', component: EmployeeDetailComponent },
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgxCurrencyModule
    ],
    exports: [],
    declarations: [
        EmployeeListComponent,
        EmployeeDetailComponent,
        EmployeeAddComponent
    ],
    providers: [EmployeeService, EmplyRepository],
})
export class PagesModule { }
