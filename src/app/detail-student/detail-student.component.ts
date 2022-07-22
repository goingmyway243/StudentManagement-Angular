import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {
  @Input() student?: Student;
  detailForm: FormGroup = new FormGroup('');

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStudent();
    this.createForm();
  }

  getStudent(): void {
    let id: string = String(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(id).subscribe(data => this.student = data);
  }

  updateStudent(): void {
    if (this.detailForm.invalid || this.student == null) {
      return;
    }

    this.studentService.update(this.student).subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.detailForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }
}
