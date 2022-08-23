import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Catalog from "./components/catalog/Catalog";
import MovieDetail from "./components/movie-detail/MovieDetail";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        { name: "Mona", color: "#3498DB", rentedMovies:[] },
        { name: "Jasmyne", color: "#E74C3C", rentedMovies:[] },
        { name: "Aura", color: "#2ECC71", rentedMovies:[] },
        { name: "Tina", color: "#F1C40F", rentedMovies:[] },
      ],
      movies: [
        {
          id: 0,
          isRented: false,
          title: "Tarzan",
          year: 1999,
          img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811",
          descrShort:
            "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out.",
        },
        {
          id: 1,
          isRented: false,
          title: "The Lion King",
          img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg",
          year: 1994,
          descrShort:
            "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies.",
        },
        {
          id: 2,
          isRented: false,
          title: "Beauty and the Beast",
          year: 1991,
          img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg",
          descrShort:
            "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself.",
        },
        {
          id: 3,
          isRented: false,
          title: "The Sword in the Stone",
          year: 1963,
          img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg",
          descrShort:
            "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means.",
        },
        {
          id: 4,
          isRented: false,
          title: "Beauty and the Beast",
          year: 2016,
          img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg",
          descrShort:
            "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation.",
        },
      ],
      budget: 10,
      filteredMovies: [],
      searchField: "",
      currentUser: null
    };
  }

  componentDidMount() {
    const movies = [...this.state.movies];
    this.setState({
      filteredMovies: movies,
    });
  }

  changeRent = (id) => {
    const movies = [...this.state.movies];
    const movie = movies.find((m) => m.id === id);
    movie.isRented = !movie.isRented;
    const increase = 3;
    const dicrease = -3;
    let budgetEdit;
    if(movie.isRented) {
      budgetEdit = this.state.budget + dicrease
      this.setState({
        movies: movies,
        budget: budgetEdit,
      }, () => {
        if(this.state.currentUser) {
          this.addMovieToUser(movie)
        }
      });
    } else {
      budgetEdit = this.state.budget + increase
      this.setState({
        movies: movies,
        budget: budgetEdit,
      }, () => {
        if(this.state.currentUser) {
          this.removeMovieFromUser(movie)
        }
      })
    }
  };

  addMovieToUser = movie => {
    const users = [...this.state.users];
    const user = users.find(u => u.name === this.state.currentUser);
    user.rentedMovies.push(movie)
    this.setState({
      users: users
    })
  }

  removeMovieFromUser = movie => {
    const users = [...this.state.users];
    const user = users.find(u => u.name === this.state.currentUser);
    const movieIndex = user.rentedMovies.indexOf(movie)
    user.rentedMovies.splice(movieIndex, 1);
    this.setState({
      users: users
    })
  }

  onSearchChange = (input) => {
    this.setState({
      searchField: input
    }, () => {
      this.filterMovies()
    })
  };

  filterMovies = () => {
    const searchField = this.state.searchField
    let movies = [...this.state.movies];
    movies = movies.filter((m) => {
      return m.title.includes(searchField);
    });
    this.setState({
      filteredMovies: movies,
    })
  }

  changeCurrentUser = name => {
    this.setState({
      currentUser: name
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav id="navbar">
            <div>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/catalog">Catalog</Link>
            </div>
            <div><Link className="logo" to="/">Reflix</Link></div>
          </nav>
          <Route
            path="/"
            exact
            render={() => <Landing users={this.state.users} changeCurrentUser={this.changeCurrentUser} />}
          />
          <Route
            path="/catalog"
            exact
            render={() => (
              <Catalog
                movies={this.state.filteredMovies}
                rentedMovies={this.state.rentedMovies}
                budget={this.state.budget}
                changeRent={this.changeRent}
                searchField={this.searchField}
                onSearchChange={this.onSearchChange}
              />
            )}
          />
          <Route
            path="/movies/:id"
            exact
            render={({ match }) => (
              <MovieDetail match={match} movies={this.state.movies} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
