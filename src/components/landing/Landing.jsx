import React, { Component } from 'react';
import User from '../user/User';
import './Landing.css'

class Landing extends Component {

    render() {
        return (
            <div className='landing'>
                <h1 className='selectUser'>WHO'S WATCHING?</h1>
                <div className='Users'>
                    {this.props.users.map(user => <User user={user} changeCurrentUser={this.props.changeCurrentUser} />)}
                </div>
            </div>
        );
    }
}

export default Landing;