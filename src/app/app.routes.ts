import { Routes } from '@angular/router';


import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { IndexComponent } from './Blogs/index/index.component';
import { AddPostComponent } from './Blogs/add-post/add-post.component';
import { AuthorComponent } from './Blogs/author/author.component';
import { ViewPostsComponent } from './Blogs/view-posts/view-posts.component';
import { LastComponent } from './Blogs/last/last.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  // {
  //   path: 'app-post',
  //   loadComponent: () =>
  //     import('./Blogs/add-post/add-post.component').then(
  //       (m) => m.AddPostComponent
  //     )
  // },
 
  
  {
    path:'index',
    component:IndexComponent

  }, 
  {
    path:'add-post',
    component:AddPostComponent

  },{
    path:'author',
    component:AuthorComponent
  },{
    path:'view-posts',
    component:ViewPostsComponent
  },{
    path:'last',
    component:LastComponent
  },
  {
    path:'author/:id',
    component:AuthorComponent
  }
  // {
  //   path: 'author/:id',
  //   loadComponent: () => import('./Blogs/author/author.component').then(m => m.AuthorComponent)
  // }
  
];
