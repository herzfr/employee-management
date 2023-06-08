import { Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { IEmployee } from 'src/app/shared/interface';
import { Store } from '@ngrx/store';
import { selectAllEmployee, selectEmplError, selectEmplLoading } from '../_ngrx/employee.selectors';
import { loadEmployees } from '../_ngrx/employee.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmplyRepository } from '../_services/employee.repository';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'birthDate', 'basicSalary', 'status', 'group', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource<IEmployee>([]);

  emplys$: Observable<IEmployee[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private router: Router, private emplRepo: EmplyRepository, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emplRepo.emplys$?.subscribe(() => {
      this.dataSource = new MatTableDataSource<IEmployee>(this.emplRepo.emplyList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  addEmpl() {
    this.router.navigate(['home/add'])
  }

  editEmpl(username: string) {
    this.router.navigate(['home/' + username])
  }

  deleteEmpl(username: string) {
    console.log(username);
    // this.emplRepo.deleteEmpl(username)
    this.openSnackBar(`Delete Success ${username}`)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    },);
  }

}


