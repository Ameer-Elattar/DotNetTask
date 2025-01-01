import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from '../../services/subjects.service';
@Component({
  selector: 'app-edit-subject',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css',
})
export class EditSubjectComponent implements OnInit {
  subjectForm!: FormGroup;
  subId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private subjectService: SubjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subId = +this.route.snapshot.paramMap.get('id')!;

    this.subjectService.getSubjectById(this.subId).subscribe((sub: any) => {
      this.subjectForm = this.fb.group({
        name: [sub[0].name, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.subjectForm.valid) {
      const updatedSub = {
        ...this.subjectForm.value,
      };

      this.subjectService
        .updateSubject(this.subId, updatedSub)
        .subscribe((response) => {
          this.router.navigateByUrl('subjects');
        });
    }
  }
}
