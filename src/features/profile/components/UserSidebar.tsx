import {
  Box,
  VStack,
  Avatar,
  Heading,
  Text,
  HStack,
  Icon,
  Button,
  Link,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiHeart,
  FiBriefcase,
  FiMapPin,
  FiMail,
  FiLink,
  FiTwitter,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import type { User } from '../../../shared/types/github';

interface UserSidebarProps {
  user: User;
}

export default function UserSidebar({ user }: UserSidebarProps) {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const StatsSection = (
    <Flex
      mt={{ base: '1rem', md: '1.5rem' }}
      gap={{ base: '1rem', md: '0.5rem' }}
      flexDirection={{ base: 'row', md: 'column' }}
      width='100%'
      justifyContent='flex-start'
    >
      <HStack spacing='0.5rem'>
        {' '}
        <Icon as={FiUsers} boxSize={4} color='var(--text-secondary)' />
        <Text fontSize='0.875rem' color='var(--text-secondary)'>
          {user.followers} {t('profile.followers')}
        </Text>
      </HStack>
      <HStack spacing='0.5rem'>
        {' '}
        <Icon as={FiHeart} boxSize={4} color='var(--text-secondary)' />
        <Text fontSize='0.875rem' color='var(--text-secondary)'>
          {user.following} {t('profile.following')}
        </Text>
      </HStack>
    </Flex>
  );

  const BioSection = (
    <Text
      mt={{ base: '1.5rem', md: '1.0625rem' }}
      color='var(--text-secondary)'
      fontSize='1rem'
      lineHeight='tall'
      textAlign='left'
      width='100%'
    >
      {user.bio}
    </Text>
  );

  return (
    <Box
      bg={{ base: 'var(--brand-purple-light)', md: 'var(--bg-white)' }}
      px='1rem'
      pt='1.5rem'
      pb='1rem'
      borderRadius={{ base: '0', md: '0.25rem' }}
      width='100%'
    >
      <VStack align='start' spacing={0}>
        <HStack
          spacing='1rem'
          alignItems='center'
          width='100%'
          justifyContent='flex-start'
        >
          <Avatar
            boxSize='48px'
            src={user.avatar_url}
            name={user.name || user.login}
            borderRadius='full'
          />
          <Box>
            <Heading
              fontSize='1.25rem'
              fontWeight='bold'
              color='var(--text-primary)'
            >
              {user.name}
            </Heading>
            <Text color='var(--text-secondary)' fontSize='0.875rem'>
              @{user.login}
            </Text>
          </Box>
        </HStack>

        {isMobile ? (
          <>
            {StatsSection}
            {BioSection}
          </>
        ) : (
          <>
            {BioSection}
            {StatsSection}
          </>
        )}

        <Flex
          mt='1.5rem'
          wrap='wrap'
          flexDirection={{ base: 'row', md: 'column' }}
          justifyContent='flex-start'
          gap={{ base: '1rem', md: '0.5rem' }}
          width='100%'
        >
          {user.company && (
            <HStack spacing='0.5rem' minW='fit-content'>
              {' '}
              <Icon
                as={FiBriefcase}
                boxSize={4}
                color='var(--text-secondary)'
              />
              <Text fontSize='0.875rem' color='var(--text-secondary)'>
                {user.company}
              </Text>
            </HStack>
          )}
          {user.location && (
            <HStack spacing='0.5rem' minW='fit-content'>
              {' '}
              <Icon as={FiMapPin} boxSize={4} color='var(--text-secondary)' />
              <Text fontSize='0.875rem' color='var(--text-secondary)'>
                {user.location}
              </Text>
            </HStack>
          )}
          {user.email && (
            <HStack spacing='0.5rem' minW='fit-content'>
              {' '}
              <Icon as={FiMail} boxSize={4} color='var(--text-secondary)' />
              <Text fontSize='0.875rem' color='var(--text-secondary)'>
                {user.email}
              </Text>
            </HStack>
          )}
          {user.blog && (
            <HStack spacing='0.5rem' minW='fit-content'>
              {' '}
              <Icon as={FiLink} boxSize={4} color='var(--text-secondary)' />
              <Link
                href={
                  user.blog.startsWith('http')
                    ? user.blog
                    : `https://${user.blog}`
                }
                isExternal
                fontSize='0.875rem'
                color='var(--text-secondary)'
                _hover={{ color: 'var(--brand-blue)' }}
              >
                {user.blog.replace(/^https?:\/\//, '')}
              </Link>
            </HStack>
          )}
          {user.twitter_username && (
            <HStack spacing='0.5rem' minW='fit-content'>
              {' '}
              <Icon as={FiTwitter} boxSize={4} color='var(--text-secondary)' />
              <Link
                href={`https://twitter.com/${user.twitter_username}`}
                isExternal
                fontSize='0.875rem'
                color='var(--text-secondary)'
                _hover={{ color: 'var(--brand-blue)' }}
              >
                @{user.twitter_username}
              </Link>
            </HStack>
          )}
        </Flex>

        {!isMobile && (
          <Button
            mt='1.5rem'
            width='100%'
            height='45px'
            bg='var(--brand-purple)'
            color='white'
            fontSize='0.875rem'
            fontWeight='bold'
            borderRadius='6px'
            _hover={{ bg: 'var(--brand-purple-hover)' }}
            onClick={() => {
              const url =
                user.blog ||
                (user.twitter_username
                  ? `https://twitter.com/${user.twitter_username}`
                  : null);
              if (url)
                window.open(
                  url.startsWith('http') ? url : `https://${url}`,
                  '_blank',
                );
            }}
            display={user.blog || user.twitter_username ? 'flex' : 'none'}
          >
            {t('profile.contact')}
          </Button>
        )}
      </VStack>
    </Box>
  );
}
