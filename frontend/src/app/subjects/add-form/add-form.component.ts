import { Component, OnDestroy } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SubjectsService } from '../../services/subjects.service';
@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent {
  subjectForm: FormGroup;
  sub: Subscription | null = null;
  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectsService,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      const subData = this.subjectForm.value;
      this.sub = this.subjectService.createSubject(subData).subscribe((res) => {
        this.subjectForm.reset();
        this.router.navigateByUrl('subjects');
      });
    }
  }
}
