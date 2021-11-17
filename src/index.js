import React, { StrictMode } from "react";
import SearchForm from "./SearchForm.js";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJoke: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJoke = this.searchJoke.bind(this);
  }

  searchJoke(limit = 5) {
    this.setState({ isFetchingJoke: true });

    fetch(
      `https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          jokes: json.results,
          isFetchingJoke: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({
      searchTerm: value
    });
  }

  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map((item) => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img className="logo" src="/download.png" />

        <SearchForm
          onFormSubmit={this.searchJoke}
          onFormChange={this.onSearchChange}
          onFormFetch={this.state.isFetchingJoke}
          onFormClick={() => this.searchJoke(1)}
        />

        {this.state.isFetchingJoke ? "Loading joke..." : this.renderJokes()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App version="1.0" />
  </StrictMode>,
  rootElement
);
