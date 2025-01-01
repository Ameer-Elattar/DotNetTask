import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../services/subjects.service';
import { Subject } from '../models/subject';
declare const Swal: any;

@Component({
  selector: 'app-subjects',
  imports: [RouterLink],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  delSub: Subscription | null = null;
  subjects: Subject[] = [];
  constructor(private subjectService: SubjectsService) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.delSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.loadSubjects();
  }
  loadSubjects() {
    return this.subjectService.getAllSubjects().subscribe((data: Subject[]) => {
      this.subjects = data;
    });
  }
  deleteSubject(id: number | undefined) {
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
          this.delSub = this.subjectService.deleteSubject(id).subscribe(() => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            this.loadSubjects();
          });
        }
      });
    } else {
      console.error('Subject ID is undefined.');
    }
  }
}
