import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article, User } from '@realworld/core/api-types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoAuthors } from '@realworld/core/api-types/src/lib/coauthor';

@Component({
  selector: 'cdt-article-coauthors',
  standalone: true,
  templateUrl: './article-coauthors.component.html',
  styleUrls: ['./article-coauthors.component.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCoAuthorsComponent {
  @Input() article!: Article;
  coAuthors: CoAuthors[] = [];
  anyCoAuthors = false;
  ngOnInit() {
    let authorName = this.article.author.username;
    this.article.coAuthors.forEach((coAuthor) => {
      if (coAuthor.username != authorName) this.coAuthors.push(coAuthor);
    });
    this.anyCoAuthors = this.coAuthors.length > 0;
  }
}
