import React, { Component } from 'react';


class Landing extends Component {
    render() {
        return (
            <body>
                <div class="img-back">
                    <p class="welcome1">Welcome on MashMusic</p>
                    <p class="welcome2">We propose unlimited music for you.Listen anywhere.</p>
                </div>
                <div class="about">
                    <div class="row no-gutters justify-content-md-center">
                        <div class="col-lg-4">
                            <p class="header-text">Enjoy music with MashMusic</p>
                            <p class="body-text">Listen on different devices Desktop,laptop,smartphone and more</p>
                        </div>
                        <div class="col-lg-1">

                        </div>
                        <div class="col-lg-4 img-block">
                            <img src={require("../static/images/group3.png")} alt="pic" />
                        </div>
                    </div>
                </div>
                <div class="about">
                    <div class="row no-gutters justify-content-md-center">
                        <div class="col-lg-4">
                            <p class="header-text">Enjoy music with MashMusic</p>
                            <p class="body-text">Listen on different devices Desktop,laptop,smartphone and more</p>
                        </div>
                        <div class="col-lg-1">

                        </div>
                        <div class="col-lg-4 img-block">
                            <img src={require("../static/images/group3.png")} alt="pic" />
                        </div>
                    </div>
                </div>
                <div class="about">
                    <div class="row no-gutters justify-content-md-center">
                        <div class="col-lg-4">
                            <p class="header-text">Enjoy music with MashMusic</p>
                            <p class="body-text">Listen on different devices Desktop,laptop,smartphone and more</p>
                        </div>
                        <div class="col-lg-1">

                        </div>
                        <div class="col-lg-4 img-block">
                            <img src={require("../static/images/group3.png")} alt="pic" />
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}

export default Landing;