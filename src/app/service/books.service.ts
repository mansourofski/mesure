import {Injectable} from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() {
  }

  books: Book [] = [];
  bookSubject = new Subject<Book[]>();

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.default.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.default.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.default.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée!');
        }
      ).catch(
        (error) => {
          console.log('fichier non trouvé : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEle) => {
        if (bookEle === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, rejects) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.default.storage().ref()
          .child('images/' + uniqueFileName + file.name)
          .put(file);
        upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('changement...');
          },
          (error) => {
            console.log('erreur de chargement : ' + error);
            rejects();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
