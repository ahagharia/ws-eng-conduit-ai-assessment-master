import { DynamicFormComponent, Field, formsActions, ListErrorsComponent, ngrxFormsQuery } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { articleEditActions, articleQuery } from '@realworld/articles/data-access';

const structure: Field[] = [
  {
    type: 'INPUT',
    label: 'Article Title',
    name: 'title',
    placeholder: 'Enter a cool & snappy title',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    label: "What's the article about?",
    name: 'description',
    placeholder: 'Enter a one sentence summary of the article',
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    label: 'Article',
    name: 'body',
    placeholder: 'Write your article',
    validator: [Validators.required],
  },
  {
    type: 'BADGEINPUT',
    label: 'Tags',
    name: 'tagList',
    placeholder: 'Add tags',
    validator: [],
  },
  {
    type: 'BADGEINPUT',
    label: 'Co-Authors',
    name: 'coAuthorUsernames',
    placeholder: 'Add Co-Authors',
    validator: [],
  },
];

@UntilDestroy()
@Component({
  selector: 'cdt-article-edit',
  standalone: true,
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  imports: [DynamicFormComponent, ListErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  isNew = false;
  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));

    this.store
      .select(articleQuery.selectData)
      .pipe(untilDestroyed(this))
      .subscribe((article) => {
        this.store.dispatch(formsActions.setData({ data: article }));
        if (article?.slug) {
          this.isNew = false;
        } else {
          this.isNew = true;
        }
      });
  }

  updateForm(changes: any) {
    if (changes && changes.tagList && typeof changes.tagList.split == 'function') {
      changes.tagList = changes.tagList.split(',');
      for (let index = 0; index < changes.tagList.length; index++) {
        changes.tagList[index] = changes.tagList[index].replace(/\s/g, '');
      }
    }
    this.store.dispatch(formsActions.updateData({ data: changes }));
    this.lock();
  }

  submit() {
    this.store.dispatch(articleEditActions.publishArticle());
    this.unlock();
  }

  ngOnDestroy() {
    this.unlock();
    this.store.dispatch(formsActions.initializeForm());
  }

  lock() {
    if (!this.isNew) this.store.dispatch(articleEditActions.lockArticle());
  }

  unlock() {
    if (!this.isNew) this.store.dispatch(articleEditActions.unlockArticle());
  }
}
