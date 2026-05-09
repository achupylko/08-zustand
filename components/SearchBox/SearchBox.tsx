import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, handleChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      defaultValue={value}
      onChange={handleChange}
      placeholder="Search notes"
    />
  );
}
