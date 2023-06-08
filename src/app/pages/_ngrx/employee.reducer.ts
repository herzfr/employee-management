import { createReducer, on } from "@ngrx/store";
import { IEmployee } from "src/app/shared/interface";
import * as EmployeeAction from './employee.action'

export interface EmployeeState {
    emplys: IEmployee[];
    loading: boolean;
    error: string;
}

export const initialState: EmployeeState = {
    emplys: [],
    loading: false,
    error: '',
};

export const emplyReducer = createReducer(
    initialState,
    on(EmployeeAction.createEmply, (state, { emply }) => ({
        ...state, emplys: [...state.emplys, emply], loading: true
    })),
    on(EmployeeAction.updateEmply, (state, { emply }) => ({
        ...state, loading: true
    })),
    on(EmployeeAction.deleteEmply, (state, { username }) => ({
        ...state, loading: true
    })),
    on(EmployeeAction.loadEmployees, (state) => ({
        ...state, loading: true, error: ''
    })),
    on(EmployeeAction.loadEmployeesSuccess, (state, { emplys }) => ({
        ...state, emplys, loading: false
    })),
    on(EmployeeAction.loadEmployeesFailure, (state, { error }) => ({
        ...state, loading: false, error,
    })),
)
