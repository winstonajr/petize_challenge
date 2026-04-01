import { Flex, Heading, Text } from '@chakra-ui/react';
import SearchForm from '../features/search/components/SearchForm';

export default function Home() {
  return (
    <Flex
      height={{ base: '100dvh', md: '100vh' }}
      width='100vw'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      bg='var(--bg-white)'
      overflow='hidden'
      position='fixed'
      top={0}
      left={0}
    >
      <Heading
        fontSize={{ base: '3.125rem', md: '5rem' }}
        fontWeight='medium'
        textAlign='center'
        mb={{ base: '2rem', md: '3.25rem' }}
      >
        <Text as='span' color='var(--brand-blue)'>
          Search
        </Text>{' '}
        <Text as='span' color='var(--brand-purple)'>
          d_evs
        </Text>
      </Heading>

      <SearchForm />
    </Flex>
  );
}
