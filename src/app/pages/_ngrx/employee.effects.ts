import { Injectable } from "@angular/core";
import { EmployeeService } from "../_services/employee.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { EmplyRepository } from "../_services/employee.repository";

import * as EmployeeAction from './employee.action'

@Injectable()
export class EmplyEffects {
    constructor(private actions$: Actions, private emplService: EmployeeService, private emplyRepo: EmplyRepository) { }

    loadEmplyees$ = createEffect(() =>
        this.actions$.pipe(ofType(EmployeeAction.loadEmployees),
            mergeMap(() => this.emplService.getEmployees()),
            map((emplys => EmployeeAction.loadEmployeesSuccess({ emplys }))),
            catchError((error) => of(EmployeeAction.loadEmployeesFailure({ error })))
        ))

}
