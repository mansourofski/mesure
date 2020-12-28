import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../models/Book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: Book;

  constructor(private bookService: BooksService,
              private  route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
    console.log(this.book.photo) ;
  }

  onBack() {
    this.router.navigate(['/books']);
  }
}
