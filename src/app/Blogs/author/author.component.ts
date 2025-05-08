import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  authorId!: string;
  UserAtributes: any;
  commentsList: any[] = [];
  commentContent: string = '';

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id')!;
    if (this.authorId) {
      this.getAuthor(this.authorId);
      this.getComments(this.authorId);
    }
  }

  getAuthor(id: string) {
    this.http.get(`http://localhost:8080/api/author/${id}`)
      .subscribe({
        next: (res) => {
          this.UserAtributes = res;
        },
        error: (err) => {
          console.error('Error fetching author:', err);
        }
      });
  }

  getComments(id: string) {
    this.http.get<any[]>(`http://localhost:8080/api/author/${id}/command`).subscribe(
       (res) => {
        this.commentsList = res;
      },
      (err) => {
        console.error('Error fetching commands:', err);
      
    });
  }
  

  addComment() {
    if (this.commentContent.trim()) {
      const url = `http://localhost:8080/api/author/${this.authorId}/command`;
      const body = { content: this.commentContent };
      this.http.post(url, body).subscribe({
        next: () => {
          this.getComments(this.authorId);
          this.commentContent = '';
        },
        error: (err) => {
          console.error('Error posting comment:', err);
        }
      });
    }
  }

  likeAuthor() {
    console.log("Like button clicked");
    this.http.put(`http://localhost:8080/api/author/${this.authorId}/like`, {})
      .subscribe({
        next: (updatedAuthor) => {
          console.log("Updated author from like:", updatedAuthor);
          this.UserAtributes = updatedAuthor;
        },
        error: (err) => {
          console.error('Error liking the author:', err);
        }
      });
  }
  
  deleteComment(commentId: number) {
    const url = `http://localhost:8080/api/comment/${commentId}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.getComments(this.authorId); 
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
      }
    });
  }
  
  
  

  onImgError(event: any) {
    event.target.src = 'assets/image/default.png';
  }
}
