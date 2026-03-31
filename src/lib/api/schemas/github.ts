import { z } from 'zod';
import type { User, Repo } from '../../../shared/types/github';

export const UserSchema: z.ZodType<User> = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});

export const RepoSchema: z.ZodType<Repo> = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string(),
  html_url: z.string().url(),
});
