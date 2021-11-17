import React from "react";

import "./SearchForm.css";

const SearchForm = (props) => {
  const onSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit();
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter search term..."
        onChange={(event) => props.onFormChange(event.target.value)}
      />
      <div>
        <button disabled={props.onFormFetch}>Joke</button>
        <button onClick={props.onFormClick} disabled={props.onFormFetch}>
          I'm Feeling Funny
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
