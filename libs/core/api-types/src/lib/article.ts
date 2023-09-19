import { CoAuthors } from './coauthor';
import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  coAuthors: CoAuthors[];
  lockedBy?: Profile;
  lastActivity?: Date;
}

export interface ArticleResponse {
  article: Article;
}
