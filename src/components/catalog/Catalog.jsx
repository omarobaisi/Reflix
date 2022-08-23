import React, { Component } from 'react';
import Movie from '../movie/Movie';
import './Catalog.css'

class Catalog extends Component {

    onSearchChange = e => {
        this.props.onSearchChange(e.target.value)
    }

    render() {
        const rentedMovies = this.props.movies.filter(m => m.isRented === true);
        return (
            <div>
                <div className='input-budget'>
                    <input className='searchInput' type="text" value={this.props.searchField} onChange={this.onSearchChange} placeholder="Search" />
                    <div>Budget: ${this.props.budget}</div>
                </div>
                {rentedMovies.length === 0 ? (
                    ''
                ) : (
                    <div className='Rented'>
                        <div>Rented:</div>
                        <div>
                            {rentedMovies.map(movie => <Movie movie={movie} changeRent={this.props.changeRent} key={movie.id}/>)}
                        </div>
                    </div>
                )}
                <div className='Catalog'>
                    <div>Catalog:</div>
                    <div>
                        {this.props.movies.map(movie => <Movie movie={movie} changeRent={this.props.changeRent} key={movie.id}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Catalog;