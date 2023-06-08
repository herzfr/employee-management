import { Observable, map, startWith } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee, IUserLogin } from 'src/app/shared/interface';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Location } from '@angular/common';
import { EmplyRepository } from '../_services/employee.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  emplys$: Observable<IEmployee[]> | undefined;
  employeeForm: FormGroup = {} as FormGroup
  maxDate: Date = new Date()

  options: string[] = ['One', 'Two', 'Three', 'Ones', 'Twos', 'Threes', '1One', '2Two', '3Three'];
  filteredOptions: Observable<string[]> = new Observable<string[]>;

  currencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 0,
    prefix: 'Rp ',
    thousands: '.',
    suffix: '',
    nullable: false,
    inputMode: CurrencyMaskInputMode.FINANCIAL,
  };

  constructor(private formBuilder: FormBuilder, private location: Location, private emplRepo: EmplyRepository, private router: Router) { }

  get groups() { return this.employeeForm.get('group') }
  get status() { return this.employeeForm.get('status') }
  get salary() { return this.employeeForm.get('basicSalary') }

  ngOnInit(): void {
    this.buildForm()
    this.filteredOptions = this.groups!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      basicSalary: [null, [Validators.required]],
      status: ['active', [Validators.required]],
      group: [null, [Validators.required]],
      description: [new Date(), [Validators.required]],
    })
  }

  async submit({ value, valid }: { value: IEmployee, valid: boolean }) {
    console.log(value);
    this.addNewProduct(value)

  }

  addNewProduct(emply: IEmployee) {
    this.emplRepo.employeeD = [...this.emplRepo.employeeD, emply]
    this.router.navigate([''])
  }

  back() {
    this.location.back()
  }



}
