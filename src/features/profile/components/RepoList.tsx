import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  Icon,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FiStar, FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import type { Repo } from '../../../shared/types/github';
import type { RepoSortOrder } from '../../../shared/types/sort';

interface RepoListProps {
  repos: Repo[];
  sortBy: RepoSortOrder;
  onSortChange: (value: RepoSortOrder) => void;
  hasMore: boolean;
  loadMoreRef: (node?: Element | null | undefined) => void;
}

export default function RepoList({
  repos,
  sortBy,
  onSortChange,
  hasMore,
  loadMoreRef,
}: RepoListProps) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language.startsWith('pt') ? ptBR : enUS;

  const sortLabels: Record<RepoSortOrder, string> = {
    updated: t('sort.updated'),
    created: t('sort.created'),
    pushed: t('sort.pushed'),
    full_name: t('sort.full_name'),
  };

  return (
    <Box
      bg={{ base: 'transparent', md: 'var(--bg-white)' }}
      borderRadius={{ base: '0', md: '0.25rem' }}
      border='none'
      px={{ base: '1rem', md: '1.5rem' }}
      pt='1.5rem'
      pb='1.5rem'
      position='relative'
    >
      <Box
        position='absolute'
        top='1.5rem'
        right={{ base: '1rem', md: '1.5rem' }}
        zIndex={2}
      >
        <HStack spacing={2}>
          <Text fontSize='xs' color='var(--text-secondary)' fontWeight='500'>
            {t('profile.sort_by').toUpperCase()}
          </Text>

          <Menu variant='outline'>
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              variant='ghost'
              size='xs'
              fontSize='xs'
              fontWeight='bold'
              color='var(--brand-purple)'
              _hover={{ bg: 'var(--brand-purple-light)' }}
              _active={{ bg: 'var(--brand-purple-light)' }}
              textTransform='capitalize'
            >
              {sortLabels[sortBy]}
            </MenuButton>
            <MenuList
              fontSize='xs'
              minWidth='150px'
              borderColor='var(--border-gray)'
              shadow='sm'
            >
              <MenuItem onClick={() => onSortChange('updated')}>
                {t('sort.updated')}
              </MenuItem>
              <MenuItem onClick={() => onSortChange('created')}>
                {t('sort.created')}
              </MenuItem>
              <MenuItem onClick={() => onSortChange('pushed')}>
                {t('sort.pushed')}
              </MenuItem>
              <MenuItem onClick={() => onSortChange('full_name')}>
                {t('sort.full_name')}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

      <VStack align='stretch' spacing='1rem' pt={{ base: '3rem', md: '0' }}>
        {repos.map(repo => (
          <Box
            key={repo.id}
            borderBottom='1px solid'
            borderColor='var(--border-gray)'
            pb='1rem'
          >
            <Link
              href={repo.html_url}
              isExternal
              fontWeight='bold'
              fontSize='1.25rem'
              color='var(--text-primary)'
              _hover={{ color: 'var(--brand-purple)' }}
            >
              {repo.name}
            </Link>

            <Text
              color='var(--text-secondary)'
              fontSize='1rem'
              mt='1rem'
              mb='1rem'
              noOfLines={3}
            >
              {repo.description}
            </Text>

            <Flex
              alignItems='center'
              gap='0.75rem'
              color='var(--text-secondary)'
              fontSize='0.875rem'
            >
              <HStack spacing='0.5rem'>
                <Icon as={FiStar} boxSize='1rem' />
                <Text>{repo.stargazers_count}</Text>
              </HStack>

              <Text>•</Text>

              <Text>
                {t('profile.updated', {
                  time: formatDistanceToNow(new Date(repo.updated_at), {
                    addSuffix: true,
                    locale: currentLocale,
                  }),
                })}
              </Text>
            </Flex>
          </Box>
        ))}
      </VStack>

      {hasMore && (
        <Box ref={loadMoreRef} py={8} textAlign='center'>
          <Spinner color='var(--brand-purple)' />
        </Box>
      )}
    </Box>
  );
}
