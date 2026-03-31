import axios from 'axios';
import { UserSchema, RepoSchema } from './schemas/github';
import type { User, Repo } from '../../shared/types/github';
import type { RepoSortOrder } from '../../shared/types/sort';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const getGitHubUser = async (username: string): Promise<User> => {
  const { data } = await api.get(`/users/${username}`);
  return UserSchema.parse(data);
};

export const getGitHubRepos = async (
  username: string,
  page = 1,
  perPage = 10,
  sort: RepoSortOrder = 'updated',
): Promise<Repo[]> => {
  const { data } = await api.get(`/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
      sort,
    },
  });
  return RepoSchema.array().parse(data);
};
