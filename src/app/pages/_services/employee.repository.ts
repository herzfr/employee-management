import { Injectable, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IEmployee } from "src/app/shared/interface";
import { selectAllEmployee, selectEmplError, selectEmplLoading } from "../_ngrx/employee.selectors";
import { loadEmployees } from "../_ngrx/employee.action";

@Injectable({ providedIn: 'root' })
export class EmplyRepository {



    emplys$: Observable<IEmployee[]> | undefined;
    employeeD: IEmployee[] = []

    constructor(private store: Store) {
        this.emplys$ = this.store.select(selectAllEmployee)
        this.store.dispatch(loadEmployees())
        this.emplys$?.subscribe(res => {
            this.employeeD = res
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
    }

    get emplyList() {
        return this.employeeD
    }

    getEmolyByUsername(username: string) {
        return this.emplyList.find(f => f.username == username)
    }

    deleteEmpl(username: string) {

    }













}