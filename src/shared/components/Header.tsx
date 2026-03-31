import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface HeaderProps {
  currentUser?: string;
}

export default function Header({ currentUser }: HeaderProps) {
  const navigate = useNavigate();
  const [headerSearch, setHeaderSearch] = useState('');

  const handleHeaderSearch = () => {
    if (headerSearch.trim()) {
      navigate(`/profile/${headerSearch}`);
      setHeaderSearch('');
    }
  };

  return (
    <Box bg='var(--bg-white)' py={5} position='sticky' top={0}>
      <Container maxWidth='full' px={28}>
        <Flex alignItems='center' gap='119'>
          <Heading
            size='md'
            minWidth='fit-content'
            cursor='pointer'
            onClick={() => navigate('/')}
          >
            <Text
              as='span'
              fontSize='2rem'
              color='var(--brand-blue)'
              fontWeight='medium'
            >
              Search
            </Text>{' '}
            <Text
              as='span'
              fontSize='2rem'
              color='var(--brand-purple)'
              fontWeight='medium'
            >
              d_evs
            </Text>
          </Heading>

          <Box width='100%' maxWidth='590px'>
            <InputGroup size='md' role='group'>
              <InputLeftElement
                pointerEvents='none'
                color='gray.400'
                _groupFocusWithin={{ color: 'var(--brand-purple)' }}
                transition='color 0.2s'
                height='100%'
                width='40px'
              >
                <FiSearch size={24} />
              </InputLeftElement>
              <Input
                px='0.875rem'
                py='0.5rem'
                height='auto'
                placeholder={currentUser || 'Search'}
                value={headerSearch}
                onChange={e => setHeaderSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleHeaderSearch()}
                borderRadius='0.375rem'
                borderColor='var(--brand-purple)'
                borderWidth='0.125rem'
                _hover={{ borderColor: 'var(--brand-purple)' }}
                _focus={{
                  borderColor: 'var(--brand-purple)',
                }}
                fontSize='1.125rem'
                bg='white'
              />
            </InputGroup>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
