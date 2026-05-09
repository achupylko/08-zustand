'use client';

import { getNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        {(isLoading || isFetching) && <Loader />}

        {isError && <ErrorMessage message={(error as Error).message} />}

        {isSuccess && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${note.updatedAt}`
                : `Created at: ${note.createdAt}`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
