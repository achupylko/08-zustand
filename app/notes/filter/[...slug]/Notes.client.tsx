'use client';

import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Link from 'next/link';
import css from './Notes.client.module.css';

type Props = {
  category: string;
};

function NotesClient({ category }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tag = category === 'all' ? undefined : category;

  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, tag, currentPage],
    queryFn: () => fetchNotes(searchQuery, tag, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    updateSearchQuery(value);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} handleChange={handleChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note
        </Link>
      </header>

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage message={(error as Error).message} />}

      {isSuccess && data.notes.length === 0 && <EmptyState />}

      {isSuccess && <NoteList items={data.notes} />}
    </div>
  );
}

export default NotesClient;
