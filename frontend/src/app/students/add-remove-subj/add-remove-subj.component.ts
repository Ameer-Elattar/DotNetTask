import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../models/student';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
declare const Swal: any;

@Component({
  selector: 'app-add-remove-subj',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './add-remove-subj.component.html',
  styleUrl: './add-remove-subj.component.css',
})
export class AddRemoveSubjComponent {
  studentForm: FormGroup;
  getStdSub: Subscription | null = null;
  getSubSub: Subscription | null = null;
  stdData: Student | null = null;
  subjects: Array<any> | null = null;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private subjectService: SubjectsService,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({});
  }
  ngOnDestroy(): void {
    this.getStdSub?.unsubscribe();
    this.getSubSub?.unsubscribe();
  }
  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id')!;
    this.getStdSub = this.studentService
      .getStudentById(studentId)
      .subscribe((std: any) => {
        this.stdData = std[0];
      });
    this.getSubSub = this.subjectService.getAllSubjects().subscribe((subjs) => {
      this.subjects = subjs.map((subject) => ({
        ...subject,
        selected: subject.students.some(
          (student) => student.name === this.stdData?.name
        ),
      }));
    });
  }
  onSubjectSelectionChange(subject: any, event: Event): void {
    const input = event.target as HTMLInputElement;  
    subject.selected = input.checked;
  }
  onSubmit() {

    if (!this.stdData || !this.subjects) {
      console.error('Student or subjects data is missing');
      return;
    }
    const selectedSubjectIds = this.subjects
      .filter((subject) => subject.selected)
      .map((subject) => subject.id);
    this.studentService
      .updateStudentSubjects(this.stdData.id, selectedSubjectIds)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Subjects updated successfully', 'success');
        },
        error: (err) => {
          Swal.fire('Failed!', 'There is an issue, try again later', 'error');
        },
      });
  }
}
