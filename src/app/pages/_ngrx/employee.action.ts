import { createAction, props } from "@ngrx/store";
import { IEmployee } from "src/app/shared/interface";

export const createEmply = createAction('[Employee] Create', props<{ emply: IEmployee }>())
export const updateEmply = createAction('[Employee] Update', props<{ emply: IEmployee }>())
export const deleteEmply = createAction('[Employee] Delete', props<{ username: string }>())
export const loadEmployees = createAction('[Employee] Load');
export const loadEmployeesSuccess = createAction('[Employee] Load Success', props<{ emplys: IEmployee[] }>());
export const loadEmployeesFailure = createAction('[Employee] Load Failure', props<{ error: string }>());