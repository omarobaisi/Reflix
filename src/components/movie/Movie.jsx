import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './movie.css'

class Movie extends Component {

    changeRent = () => {
        this.props.changeRent(this.props.movie.id);
    }

    render() {
        const movie = this.props.movie;
        return (
            <div className='movie'>
                <Link to={`/movies/${movie.id}`}><img src={movie.img} alt="" /></Link>
                {movie.isRented ? <div onClick={this.changeRent}>-</div> : <div onClick={this.changeRent}>+</div>}
            </div>
        );
    }
}

export default Movie;