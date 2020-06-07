import React, { Component } from 'react'
import {
    Card, CardImg, CardImgOverlay,
    CardTitle,
    CardText,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import {
    Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
    }


    render() {
        return (
            <React.Fragment>
                <Card className='ListCard' onClick={this.toggleModal}>
                    <CardImg className='ListImage' src={'/assets/images/add.png'} alt='add' />
                </Card>
                <CardText className='audio-list-text m-1'></CardText>
                <div className="col-12 col-md-9">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>AudioList</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="author" sm={4}>Your Name</Label>
                                    <Col sm={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your name"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="list-img" md={3}>Image</Label>
                                    <Col md={{ size: 12, offset: 0 }}>
                                        <Control.file model='.list-img' name='list-img' className='form-control'>

                                        </Control.file>
                                    </Col>
                                </Row>
                                <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}


function RenderAudioListItem({ audiolist }) {
    return (
        <div className='AudioList m-4'>
            <Link to={`/library/${audiolist.id}`} >
                <Card className='ListCard'>
                    <CardImg className='ListImage' src={audiolist.image} alt={audiolist.name} />
                </Card>
            </Link>
            <CardText className='audio-list-text m-1'>{audiolist.name}</CardText>
        </div>
    );
}

const AudioList = (props) => {
    const ListAudio = props.audiolists.map((audiolist) => {
        return (
            <RenderAudioListItem audiolist={audiolist} />
        );
    });
    return (
        <div className='container list-container'>
            <div className="row ">
                <div className='AudioList m-4'>
                    <CommentForm />
                </div>
                {ListAudio}
            </div>

        </div >
    )
}


export default AudioList;