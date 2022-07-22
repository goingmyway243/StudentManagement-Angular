import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { ListClassroomComponent } from './list-classroom/list-classroom.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: ListStudentComponent },
  { path: 'classrooms', component: ListClassroomComponent },
  { path: 'students/:id', component: DetailStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
