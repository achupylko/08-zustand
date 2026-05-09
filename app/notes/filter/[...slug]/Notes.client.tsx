'use client';

import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import EmptyState from '@/components/EmptyState/EmptyState';

import css from './Notes.client.module.css';

type Props = {
  category: string;
};

function NotesClient({ category }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tag = category === 'all' ? undefined : category;

  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, tag, currentPage],
    queryFn: () => fetchNotes(searchQuery, tag, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    },
    300
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox value={searchQuery} handleChange={updateSearchQuery} />}
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage message={(error as Error).message} />}

      {isSuccess && data.notes.length === 0 && <EmptyState />}

      {isSuccess && <NoteList items={data.notes} />}
    </div>
  );
}

export default NotesClient;
