import React, { Component } from "react";
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true


class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: '',
            password: '',
            password_confirmation: '',
            toLogin: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(this);
    }





    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/sign-up/', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        },
        ).then(response => {
            console.log(response.data);
            this.handleSuccessfulRegistration()
            // this.setState({ toLogin: true })
        }).catch(error => {
            console.log(error)
        }
        );

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSuccessfulRegistration() {
        this.props.history.push('/login')
    }

    render() {
        // if (this.state.toLogin === true) {
        //     return <Redirect to='/login' />
        // }

        return (
            <body>
                <form id="new-user-form" onSubmit={this.handleSubmit} autoComplete="off" >
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" id="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="username" id="username" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Username" name='username' onChange={this.handleChange} value={this.state.username} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" id="password" class="form-control" id="password" name="password" placeholder="Password" name='password' onChange={this.handleChange} value={this.state.password} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Repeat password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Repeat password" name='password_confirmation' onChange={this.handleChange} value={this.state.password_confirmation} />
                    </div>
                    <button type="submit" class="btn" onClick={this.redirect} id="btn">Sign-up</button>
                </form>
            </body>
        );
    }
}

export default RegistrationForm;