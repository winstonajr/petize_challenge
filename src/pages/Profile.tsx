import {
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Container,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../shared/components/Header';
import UserSidebar from '../features/profile/components/UserSidebar';
import RepoList from '../features/profile/components/RepoList';
import { useGitHubProfile } from '../features/profile/hooks/useGitHubProfile';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    user,
    repos,
    loading,
    error,
    hasMore,
    sortBy,
    updateSort,
    fetchMoreRepos,
  } = useGitHubProfile(username);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreRepos();
    }
  }, [inView, hasMore, fetchMoreRepos]);

  return (
    <Flex
      flexDirection='column'
      minHeight='100dvh'
      bg={{ base: 'var(--bg-white)', md: 'var(--bg-gray)' }}
      width='100%'
      overflowX='hidden'
    >
      {!isMobile && <Header currentUser={user?.name || user?.login} />}

      {loading && repos.length === 0 ? (
        <Flex flex='1' alignItems='center' justifyContent='center'>
          <Spinner
            size='xl'
            color='var(--brand-purple)'
            thickness='4px'
            speed='0.65s'
          />
        </Flex>
      ) : error || !user ? (
        <Flex
          flex='1'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          gap={4}
        >
          <Text fontSize='xl'>{t('search.user_not_found')}</Text>
          <Button
            onClick={() => navigate('/')}
            bg='var(--brand-purple)'
            color='white'
            _hover={{ bg: 'var(--brand-purple-hover)' }}
          >
            {t('search.button')}
          </Button>
        </Flex>
      ) : (
        <Container
          maxWidth='100%'
          pt={{ base: '0', md: '5rem' }}
          pb={{ base: '0', md: '5rem' }}
          px={{ base: '0', md: '7rem' }}
          flex='1'
        >
          <Grid
            templateColumns={{ base: '1fr', md: '300px 1fr' }}
            gap={{ base: '0', md: '2rem' }}
          >
            <GridItem minW={0}>
              <UserSidebar user={user} />
            </GridItem>
            <GridItem minW={0}>
              <RepoList
                repos={repos}
                sortBy={sortBy}
                onSortChange={updateSort}
                hasMore={hasMore}
                loadMoreRef={ref}
              />
            </GridItem>
          </Grid>
        </Container>
      )}
    </Flex>
  );
}
