import { Component, OnDestroy } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnDestroy {
  studentForm: FormGroup;
  sub: Subscription | null = null;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      this.sub = this.studentService
        .createStudent(studentData)
        .subscribe((res) => {
          this.studentForm.reset();
          this.router.navigateByUrl('students');
        });
    }
  }
}
