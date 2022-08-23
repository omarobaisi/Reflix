import React, { Component } from 'react';
import './movieDetail.css'

class MovieDetail extends Component {
    render() {
        const id = parseInt(this.props.match.params.id);
        const movie = this.props.movies.find(m => m.id === id);
        console.log(movie);
        return (
            <div>
                <h1>{movie.title} ({movie.year})</h1>
                <img src={movie.img} alt="" />
                <div>{movie.descrShort}</div>
            </div>
        );
    }
}

export default MovieDetail;