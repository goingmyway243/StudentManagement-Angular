import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student = new Student();
  studentForm: FormGroup = new FormGroup('');

  private subscription?: Subscription;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllStudent();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  createForm(): void {
    this.studentForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  getAllStudent(): void {
    this.unsubscribe();
    this.subscription = this.studentService.getAll().subscribe(data => {
      this.students = data;
    })
  }

  addStudent(student: Student): void {
    if (this.studentForm.invalid) {
      return;
    }

    this.studentService.add(student).subscribe(_ => this.getAllStudent());
  }

  deleteStudent(id: string): void {
    let student = this.students.find(s => s.id == id);

    if (student == null) {
      return;
    }

    this.studentService.delete(id).subscribe(_ => this.getAllStudent());
  }

  unsubscribe(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
