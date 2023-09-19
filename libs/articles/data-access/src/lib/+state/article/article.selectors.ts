import { createSelector } from '@ngrx/store';
import { articleFeature } from './article.reducer';

export const { selectArticleState, selectComments, selectData, selectLoaded, selectLoading } = articleFeature;
export const getAuthorUsername = createSelector(selectData, (data) => data.author.username);
export const getCoAuthorUsernames = createSelector(selectData, (data) => {
  var usernames: string[] = [];
  data.coAuthors.forEach((author) => {
    usernames.push(author.username);
  });
  return usernames;
});
export const articleLockedBy = createSelector(selectData, (data) => {
  return {
    username: data.lockedBy?.username ?? '',
    lastActivity: data.lastActivity,
  };
});

export const articleQuery = {
  selectArticleState,
  selectComments,
  selectData,
  selectLoaded,
  selectLoading,
  getAuthorUsername,
  getCoAuthorUsernames,
  articleLockedBy,
};
