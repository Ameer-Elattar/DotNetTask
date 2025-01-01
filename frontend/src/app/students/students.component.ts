import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
declare const Swal: any;

@Component({
  selector: 'app-students',
  imports: [RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  delSub: Subscription | null = null;
  students: Student[] = [];
  constructor(private studentService: StudentsService) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.delSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.loadStudents();
  }
  loadStudents() {
    return this.studentService.getAllStudnets().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  deleteUser(id: number | undefined) {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.delSub = this.studentService.deleteStudent(id).subscribe(() => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            this.loadStudents();
          });
        }
      });
    } else {
      console.error('Student ID is undefined.');
    }
  }
}
