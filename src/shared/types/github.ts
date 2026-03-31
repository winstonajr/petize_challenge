export interface User {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
}

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}
