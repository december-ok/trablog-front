import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({ query, setQuery }: SearchInputProps) {
  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="InputContainer">
      <input value={query} onChange={onQueryChange} placeholder="검색하세요!" />
    </div>
  );
}
