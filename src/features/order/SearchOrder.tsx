import { useState } from "react";
import { useNavigate } from "react-router-dom";

// interface ISearchOrderProps {}

function SearchOrder(): JSX.Element {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} action="card" id="search-form" role="search">
      <input
        placeholder="Search order #"
        type="search"
        name="search"
        value={query}
        onChange={handleChangeQuery}
      />
    </form>
  );
}

export default SearchOrder;
