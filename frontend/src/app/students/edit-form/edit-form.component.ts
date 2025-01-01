import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';
@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent implements OnInit {
  studentForm!: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;

    this.studentService.getStudentById(this.studentId).subscribe((std: any) => {
      this.studentForm = this.fb.group({
        name: [std[0].name, Validators.required],
        address: [std[0].address, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudent = {
        ...this.studentForm.value,
      };

      this.studentService
        .updateStudent(this.studentId, updatedStudent)
        .subscribe((response) => {
          this.router.navigateByUrl('students');
        });
    }
  }
}
