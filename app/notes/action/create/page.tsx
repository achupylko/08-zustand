import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

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
