import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AddFormComponent as addStudent } from './students/add-form/add-form.component';
import { AddFormComponent as addSubject } from './subjects/add-form/add-form.component';
import { EditFormComponent } from './students/edit-form/edit-form.component';
import { EditSubjectComponent } from './subjects/edit-subject/edit-subject.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { AddRemoveSubjComponent } from './students/add-remove-subj/add-remove-subj.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'students/add',
    component: addStudent,
  },
  {
    path: 'students/details/:id',
    component: StudentDetailsComponent,
  },
  {
    path: 'students/edit/:id',
    component: EditFormComponent,
  },
  {
    path: 'students/add-remove-subj/:id',
    component: AddRemoveSubjComponent,
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
  },
  {
    path: 'subjects/add',
    component: addSubject,
  },
  {
    path: 'subjects/edit/:id',
    component: EditSubjectComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
