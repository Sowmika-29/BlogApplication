import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  user = {
    name: '',
    title: '',
    photoUrl: '',
    description: ''
  };
  

  constructor(private http: HttpClient,private router:Router) {}

  postUser() {
    
    const url = 'http://localhost:8080/api/author';

    const params = new HttpParams()
      .set('name', this.user.name)
      .set('title', this.user.title)
      .set('photoUrl', this.user.photoUrl)
      .set('description', this.user.description);

    this.http.post(url, null, { params }).subscribe((result: any) => {
      
      console.log('Posted successfully:', result);
      this.router.navigate(['/last']);
    });
  }

 
}
