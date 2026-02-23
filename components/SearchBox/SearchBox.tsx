import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (value: string) => void;
}

function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <>
      <input
        className={css.input}
        type="text"
        name="id"
        placeholder="Search notes"
        defaultValue={search}
        onChange={e => onChange(e.target.value)}
      />
    </>
  );
}
export default SearchBox;
