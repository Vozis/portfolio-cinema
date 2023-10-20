import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { MovieService } from '@/services/movie.service';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { isSuccess, data } = useQuery(
    ['search-movie-list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    },
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { isSuccess, data, handleSearch, searchTerm };
};
