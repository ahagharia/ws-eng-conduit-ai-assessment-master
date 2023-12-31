import { createActionGroup, emptyProps } from '@ngrx/store';

export const articleEditActions = createActionGroup({
  source: 'Article Edit',
  events: {
    publishArticle: emptyProps(),
    publishArticleSuccess: emptyProps(),
    lockArticle: emptyProps(),
    lockArticleSuccess: emptyProps(),
    unlockArticle: emptyProps(),
    unlockArticleSuccess: emptyProps(),
  },
});
