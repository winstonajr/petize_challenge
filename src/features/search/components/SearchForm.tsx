import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function SearchForm() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/profile/${search}`);
    }
  };

  return (
    <Flex
      gap='2rem'
      width='100%'
      maxWidth='37rem'
      px='0.875rem'
      py='0.5rem'
      height='auto'
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <FormControl variant='floating' position='relative'>
        <InputGroup role='group'>
          <InputLeftElement
            pointerEvents='none'
            height='3rem'
            width='1.5rem'
            left='1rem'
            color='gray.400'
            _groupFocusWithin={{ color: 'var(--brand-purple)' }}
            _groupHover={{ color: 'var(--brand-purple)' }}
            transition='color 0.2s'
          >
            <FiSearch size={24} />
          </InputLeftElement>

          <Input
            className='search-input'
            placeholder={!isMobile ? t('search.placeholder') : ''}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            height='3rem'
            borderRadius='0.5rem'
            borderColor='var(--border-gray)'
            _hover={{ borderColor: 'var(--brand-purple)' }}
            _focus={{
              borderColor: 'var(--brand-purple)',
            }}
            pl={{ base: '3.25rem', md: '3rem' }}
            fontSize={{ base: '1rem', md: '1.125rem' }}
            _placeholder={{ fontSize: { base: '1rem', md: '1.125rem' } }}
          />

          {isMobile && (
            <FormLabel
              position='absolute'
              left={search.length > 0 ? '1rem' : '3.25rem'}
              top={search.length > 0 ? '-0.625rem' : '0.75rem'}
              _groupFocusWithin={{
                top: '-0.625rem',
                left: '1rem',
                fontSize: '0.75rem',
                color: 'var(--brand-purple)',
              }}
              bg='white'
              px={2}
              fontSize={search.length > 0 ? '0.75rem' : '1rem'}
              color={search.length > 0 ? 'var(--brand-purple)' : 'gray.400'}
              transition='all 0.2s'
              pointerEvents='none'
              zIndex={2}
            >
              {t('search.placeholder')}
            </FormLabel>
          )}
        </InputGroup>
      </FormControl>

      {!isMobile && (
        <Button
          onClick={handleSearch}
          height='auto'
          py='0.625rem'
          px='3.59375rem'
          maxWidth='11rem'
          fontSize='1.125rem'
          fontWeight={600}
          borderRadius='0.25rem'
          bg='var(--brand-purple)'
          color='white'
          _hover={{ bg: 'var(--brand-purple-hover)' }}
        >
          {t('search.button')}
        </Button>
      )}
    </Flex>
  );
}
