import { useState, useEffect, useCallback, useTransition } from 'react';
import { getGitHubUser, getGitHubRepos } from '../../../lib/api/github';
import type { User, Repo } from '../../../shared/types/github';
import type { RepoSortOrder } from '../../../shared/types/sort';

interface UseGitHubProfileResult {
  user: User | null;
  repos: Repo[];
  loading: boolean;
  loadingRepos: boolean;
  error: boolean;
  hasMore: boolean;
  sortBy: RepoSortOrder;
  updateSort: (newSort: RepoSortOrder) => void;
  fetchMoreRepos: () => Promise<void>;
}

export const useGitHubProfile = (
  username: string | undefined,
): UseGitHubProfileResult => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<RepoSortOrder>('updated');

  const [isPending, startTransition] = useTransition();

  const fetchUserAndInitialRepos = useCallback(async () => {
    if (!username) return;
    try {
      setLoading(true);
      setError(false);
      const userData = await getGitHubUser(username);
      setUser(userData);

      const initialRepos = await getGitHubRepos(username, 1, 10, sortBy);
      setRepos(initialRepos);
      setPage(1);
      setHasMore(initialRepos.length === 10);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username, sortBy]);

  const fetchMoreRepos = useCallback(async () => {
    if (!username || !hasMore || loadingRepos) return;

    try {
      setLoadingRepos(true);
      const nextPage = page + 1;
      const moreRepos = await getGitHubRepos(username, nextPage, 10, sortBy);

      if (moreRepos.length === 0) {
        setHasMore(false);
      } else {
        setRepos(prev => [...prev, ...moreRepos]);
        setPage(nextPage);
        setHasMore(moreRepos.length === 10);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRepos(false);
    }
  }, [username, page, hasMore, loadingRepos, sortBy]);

  const updateSort = (newSort: RepoSortOrder) => {
    startTransition(() => {
      setSortBy(newSort);
    });
  };

  useEffect(() => {
    fetchUserAndInitialRepos();
  }, [fetchUserAndInitialRepos]);

  return {
    user,
    repos,
    loading: loading || isPending,
    loadingRepos,
    error,
    hasMore,
    sortBy,
    updateSort,
    fetchMoreRepos,
  };
};
