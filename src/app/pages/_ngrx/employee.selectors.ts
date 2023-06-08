import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./employee.reducer";


export const selectEmplState = createFeatureSelector<EmployeeState>('emplys');

export const selectAllEmployee = createSelector(selectEmplState, (state) => state.emplys);
export const selectEmplLoading = createSelector(selectEmplState, (state) => state.loading);
export const selectEmplError = createSelector(selectEmplState, (state) => state.error);