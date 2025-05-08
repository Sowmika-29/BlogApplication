import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterLink,NgFor],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
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
