import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create new note.',
  openGraph: {
    title: 'Create Note',
    description: 'Create new note.',
    url: 'https://notehub.com/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Note',
    description: 'Create new note.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
