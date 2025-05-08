import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-posts',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-posts.component.html',
  styleUrl: './view-posts.component.css'
})
export class ViewPostsComponent implements OnInit {
  userList: any[] = [];

constructor( http:HttpClient) {}

http = inject(HttpClient);
route = inject(ActivatedRoute);

ngOnInit(): void {
  this.getUsers();
}

  getUsers(): void {
    this.http.get<any[]>('http://localhost:8080/api/authors').subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      }
    });
}

onImgError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/default.png';
}

trackByFn(index: number, item: any) {
  return item.id;
}

}
