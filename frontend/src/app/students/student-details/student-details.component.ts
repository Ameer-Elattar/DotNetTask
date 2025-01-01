import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../models/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  stdData: Student | null = null;
  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id')!;

    this.sub = this.studentService
      .getStudentById(studentId)
      .subscribe((std: any) => {
        this.stdData = std[0];
      });
  }
}
