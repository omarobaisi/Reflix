import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./user.css";

class User extends Component {
  changeCurrentUser = () => {
    this.props.changeCurrentUser(this.props.user.name);
  };

  render() {
    return (
        <Link
          className="user-link"
          key={this.props.user.name}
          onClick={this.changeCurrentUser}
          to="/catalog"
          style={{backgroundColor: this.props.user.color}}
        >
          <div>{this.props.user.name}</div>
        </Link>
    );
  }
}

export default User;
