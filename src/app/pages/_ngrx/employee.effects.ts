import { Injectable } from "@angular/core";
import { EmployeeService } from "../_services/employee.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as EmployeeAction from './employee.action'
import { Observable, catchError, map, mergeMap, of, switchMap } from "rxjs";
import { IEmployee } from "src/app/shared/interface";
import { EmplyRepository } from "../_services/employee.repository";

@Injectable()
export class EmplyEffects {
    constructor(private actions$: Actions, private emplService: EmployeeService, private emplyRepo: EmplyRepository) { }

    loadEmplyees$ = createEffect(() =>
        this.actions$.pipe(ofType(EmployeeAction.loadEmployees),
            mergeMap(() => this.emplService.getEmployees()),
            map((emplys => EmployeeAction.loadEmployeesSuccess({ emplys }))),
            catchError((error) => of(EmployeeAction.loadEmployeesFailure({ error })))
        ))

    create$ = createEffect(() => this.actions$.pipe(ofType(EmployeeAction.createEmply)))


    // https://stackblitz.com/edit/github-ngrx-crud?file=src%2Fapp%2Fgames%2Fstore%2Fgames.effects.ts,src%2Fapp%2Fgames%2Fshared%2Fgames.service.ts,src%2Fapp%2Fgames%2Fstore%2Fplatforms.effects.ts
}
