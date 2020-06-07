import React, { Component } from "react"
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true




class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            current_username: '',
            old_password: '',
            new_password: '',
            repeat_password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        // this.get_current_name = this.get_current_name.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        if (this.state.current_username == '') {
            this.get_current_name()
        }
    }

    get_current_name() {
        axios.post('http://127.0.0.1:8000/profile/get_username_info/', {
            username: sessionStorage.getItem('current_user')
        },
        ).then(response => {
            this.setState({current_username:response.data.username})
        }).catch(error => {
            console.log(error)
        }
        );
    }


    render() {
        return (
            <body>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Change Username</label>
                        <input type="username" id="username" name='current_username' value={this.state.current_username} onChange={this.handleChange} class="form-control" id="exampleInputEmail1"
                            placeholder="New Username" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Change password</label>
                        <input type="password" class="form-control" name='old_password' value={this.state.old_password} onChange={this.handleChange} id="old_password" placeholder="Old password" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name='new_password' id="new_password" onChange={this.handleChange} value={this.state.new_password} placeholder="New password" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="repeat_password" name='repeat_password' value={this.state.repeat_password} onChange={this.handleChange} placeholder="Repeat new password" />
                    </div>
                    <button type="submit" class="btn">Save</button>
                </form>
            </body>
        );
    }
}

export default Profile;