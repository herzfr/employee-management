import { Observable } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { IEmployee } from 'src/app/shared/interface';
import { Store } from '@ngrx/store';
import { selectAllEmployee, selectEmplError, selectEmplLoading } from '../_ngrx/employee.selectors';
import { loadEmployees } from '../_ngrx/employee.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmplyRepository } from '../_services/employee.repository';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'birthDate', 'basicSalary', 'status', 'group', 'description', 'info', 'edit', 'delete'];
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource<IEmployee>([]);

  emplys$: Observable<IEmployee[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('input') input: MatInput | null = null;

  constructor(
    private router: Router,
    public emplRepo: EmplyRepository,
    private _snackBar: MatSnackBar,
    private _cdf: ChangeDetectorRef,
    private _datePipe: DatePipe
  ) {
  }


  convert(val: any) {
    if (val instanceof Date) {
      return this._datePipe.transform(val, 'M/dd/yyyy')
    }
    return val
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emplRepo.emplys$?.subscribe(() => {
      this.generateList()
      this._cdf.detectChanges()
    })
  }

  generateList() {
    this.dataSource = new MatTableDataSource<IEmployee>(this.emplRepo.emplyList);
    this.dataSource.paginator = this.paginator;

    this.sort?.sort(({ id: 'username', start: 'desc', disableClear: false }) as MatSortable);
    this.dataSource.sort = this.sort;

    this._cdf.detectChanges()
    this.findData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.emplRepo.keyword = filterValue.trim().toLowerCase();
    this.findData()
  }

  findData() {
    this.dataSource.filter = this.emplRepo.keyword
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEmpl() {
    this.router.navigate(['home/add'])
  }

  detailEmpl(username: string) {
    this.router.navigate(['home/' + username])
  }

  editEmpl(username: string) {
    this.openSnackBar(`Edit username ${username}`, 'warning')
  }


  deleteEmpl(username: string) {
    this.emplRepo.deleteEmpl(username)
    this.openSnackBar(`Delete Success ${username}`, 'danger')
    this.generateList()
  }

  openSnackBar(message: string, color: 'danger' | 'warning' | 'success') {
    this._snackBar.open(message, 'X', {
      panelClass: [color],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    },);
  }

  logout() {
    sessionStorage.removeItem('M')
    this.router.navigate([''])
  }

}


