import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassroomService } from '../classroom.service';
import { Classroom } from '../models/classroom.model';

@Component({
  selector: 'app-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.css']
})
export class ListClassroomComponent implements OnInit {
  classrooms: Classroom[] = [];
  classForm!: FormGroup;

  private subscription?: Subscription;

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  createForm(): void {
    this.classForm = this.formBuilder.group({
      className: ['', Validators.required]
    })
  }

  getAll(): void {
    this.unsubscribe();
    this.subscription = this.classroomService.getAll().subscribe(data => this.classrooms = data);
  }

  addClass(className: string): void {
    if (this.classForm.invalid) {
      return;
    }

    let classroom: Classroom = new Classroom();
    classroom.className = className;

    this.classroomService.add(classroom).subscribe(_ => this.getAll());
  }

  unsubscribe(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
