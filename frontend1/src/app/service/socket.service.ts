import { Injectable } from '@angular/core';
import * as io_ from 'socket.io-client';
import { Observable, observable } from 'rxjs';

const io = io_;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  private url = 'http://10.217.10.229:8885';
  private socket;

  public connect() {
    var self = this;
    if (self.socket) {
      self.socket.destroy();
      delete self.socket;
      self.socket = null;
    }
    this.socket = io.connect(this.url);
    this.socket.on('connect', function () {
    });
    this.socket.on('disconnect', function () {
      window.setTimeout('app.connect()', 5000);
    });
  }

  public newUserLogin(username: any) {
    this.socket.emit('newUserLogin', username);
  }

  public newCategoryCreated(category: any) {
    this.socket.emit('newCategoryCreated', category);
  }

  public newPostCreatedFromClient(post: any, category: any) {
    this.socket.emit('newPostCreatedFromClient', post, category);
  }

  public newPostCreatedFromServer() {
    return Observable.create((observer) => {
      this.socket.on('newPostCreatedFromServer', (post, category) => {
        observer.next({ postId: post, categoryId: category });
      });

    });
  }

  public newCommentCreatedFromClient(comment: any, post: any) {
    this.socket.emit('newCommentCreatedFromClient', comment, post);
  }

  public newCommentCreatedFromServer() {
    return Observable.create((observer) => {
      this.socket.on('newCommentCreatedFromServer', (comment, post) => {
        observer.next({ commentId: comment, postId: post });
      });

    });
  }
}
