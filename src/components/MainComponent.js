import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Landing from './LandingComponent';
import Login from './LoginComponent'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import RegistrationForm from './RegistrationFormComponent';
import Profile from './ProfileComponent';
import AudioList from './AudioListComponent';
import { AUDIOLISTS } from '../static/files/audiolists'
import Songs from './SongsComponent'
import { SONGS } from '../static/files/songs'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInStatus: 'NOT_LOGGED_IN',
            current_user: '',
            audiolists: AUDIOLISTS,
            songs: SONGS,
            current_audiolist_id: 0,
            current_audiolist: {
            }
        }
        this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
        this.choose_current_audiolist = this.choose_current_audiolist.bind(this);
    }

    handleSuccesfulLogin(usr_name) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            current_user: usr_name
        })
        sessionStorage.setItem('current_user', this.state.current_user)
    }
    choose_current_audiolist(list_id) {
        this.setState({
            current_audiolist: this.state.audiolists.filter((audiolist) => audiolist.id === parseInt(list_id))[0],
        })
        
    }

    render() {

        return (
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={Landing} />
                        <Route exact path='/login' render={props => (
                            <Login {...props} loggedInStatus={this.state.loggedInStatus} current_user={this.state.current_user} handleSuccesfulLogin={this.handleSuccesfulLogin} />
                        )} />
                        <Route exact path='/registration' component={RegistrationForm} />
                        <Route path='/profile' component={() => <Profile current_user={this.state.current_user} />} />
                        <Route exact path='/library' render={props => (
                            <AudioList {...props} audiolists={this.state.audiolists} />
                        )} />
                        <Route path='/library/:id' render={props => (
                            <Songs {...props} songs={this.state.songs}
                                choose_current_audiolist_id={this.choose_current_audiolist_id}
                                choose_current_audiolist={this.choose_current_audiolist}
                                current_audiolist={this.state.current_audiolist}
                            />
                        )} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;