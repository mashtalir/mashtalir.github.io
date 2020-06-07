import React, { Component } from 'react'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/login/logining_process/', {
            username: this.state.username,
            password: this.state.password,
        },
        ).then(response => {
            console.log(response);
            this.props.handleSuccesfulLogin(response.data.username);
        }).catch(error => {
            console.log(error)
        }
        );

    }


    
    render() {
        return (
            <body>
                <p>{this.props.loggedInStatus}</p>
                <p>{this.props.current_user}</p>
                <form autocomplete="off" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="username" class="form-control" name="username" value={this.state.username} onChange={this.handleChange} id="username" placeholder="Username" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" />
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
            </body>
        );
    }
}

export default Login;