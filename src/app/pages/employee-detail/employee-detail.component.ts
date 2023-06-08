import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/shared/interface';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { selectAllEmployee } from '../_ngrx/employee.selectors';
import { loadEmployees } from '../_ngrx/employee.action';
import { ActivatedRoute } from '@angular/router';
import { EmplyRepository } from '../_services/employee.repository';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  emplys$: Observable<IEmployee[]> | undefined;

  constructor(private emplRepo: EmplyRepository, private location: Location, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  get emply$() {
    return this.emplRepo.getEmolyByUsername(this.activeRoute.snapshot.paramMap.get('id') as string)
  }

  ok() {
    this.location.back()
  }

}
