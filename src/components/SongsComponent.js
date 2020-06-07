import React, { Component } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import PlayList from 'react-h5-audio-player'
import {
    Card, CardImg, CardImgOverlay,
    CardTitle,
    CardText, Media
} from 'reactstrap';
import { FaBeer, FaBorderNone } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import ReactDOM from 'react-dom'

function RenderAudioItem({ song, next, current_song, prev }) {
    if (song.length !== 0) {
        return (
            <div className="col-md-12" >
                {/* <p>{song.name}</p> */}
                <PlayList className='playlist'
                    autoPlay={true}
                    src={song[current_song].song}
                    // showJumpControls={false}
                    showSkipControls={true}
                    onPlay={e => console.log("onPlay")}
                    volume='0'
                    onClickNext={next}
                    onClickPrevious={prev}
                    onEnded={next}
                    autoPlayAfterSrcChange={true}
                    customIcons={{
                        play: <FaPlayCircle style={{ color: 'pink', paddingBottom: '8px', }} size={43} />,
                        pause: <FaBeer style={{ color: 'pink', paddingBottom: '6px' }} size={43} />
                    }}
                // other props here
                />
            </div>
        );
    }
    else
        return (
            <div>

            </div>
        )


}
function RenderList({ song }) {

    return (
        <div className='row song-list-full' id={song.id}>
            <div className='col-md-4 songs-list-1 text-left '>
                {song.name}
            </div>
            <div className='col-md-3 songs-list-2 text-left'>
                {song.author}
            </div>

            <div className='col-md-3 songs-list-3 text-left'>
                {song.name}
            </div>
            <div className='col-md-2 songs-list-4 text-right'>
                {song.time}
            </div>
        </div>
    )

}

function currentAudioList(p) {
    var current_path = window.location.pathname
    var res = current_path.split('/')[2]
    p(res);
}

function currentListReturn(songs, current_audiolist_id) {
    return songs.filter((song) => parseInt(song.audiolist_id) === parseInt(current_audiolist_id))
}


class Songs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMusicIndex: 0,
            choosen: true,
        }
        this.handleClickNext = this.handleClickNext.bind(this)
        this.handleClickPrev = this.handleClickPrev.bind(this)
    }

    // handleClickNext = () => {
    //     this.setState((prevState) => ({
    //         currentMusicIndex: prevState.currentMusicIndex < this.props.length - 1 ? prevState.currentMusicIndex + 1 : 0,
    //     }))
    // }
    handleClickNext = () => {
        this.setState((prevState) => ({
            currentMusicIndex: prevState.currentMusicIndex < this.props.songs.length - 1 ? prevState.currentMusicIndex + 1 : 0,
        }))
    }
    handleClickPrev = () => {
        this.setState((prevState) => ({
            currentMusicIndex: prevState.currentMusicIndex === 0 ? this.props.songs.length - 1 : prevState.currentMusicIndex - 1,
        }))
    }



    render() {


        if (this.props.current_audiolist.id != window.location.pathname.split('/')[2]) {
            currentAudioList(this.props.choose_current_audiolist)
        }
        const ListAudio = currentListReturn(this.props.songs, this.props.current_audiolist.id).map((song) => {
            let choose_class = this.state.choosen ? "choosen" : "not_choosen";
            return (
                <RenderList song={song} />
            );
        });
        const AudioList = (props) => {
            console.log(this.props.current_audiolist.id)
            return (
                <RenderAudioItem song={currentListReturn(this.props.songs, this.props.current_audiolist.id)} next={this.handleClickNext} current_song={this.state.currentMusicIndex} prev={this.handleClickPrev} />
            );
        }


        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-12 media-bg pt-5">
                        {/* <Card className='audiolist_choosen_card '>
                        <CardImg className='audiolist_choosen_card_image' src={props.current_audiolist.image} alt={props.current_audiolist.name} />
                    </Card> */}
                        <div className='row'>
                            <div className='col-md-1'>
                            </div>
                            <div className='col-md-10'>
                                <Media className='audiolist_choosen_card '>
                                    <Media>
                                        <Media className='audiolist_choosen_card_image ml-5' object src={this.props.current_audiolist.image} alt="Generic placeholder image" />
                                    </Media>
                                    <Media body className='mt-5 ml-5'>
                                        <Media className='text-white mt-5 audiolist-header'>
                                            {this.props.current_audiolist.name}
                                        </Media>
                                        <Media className='audiolist-decription'>
                                            {'PlyaList • ' + sessionStorage.getItem('current_user')}
                                        </Media>
                                    </Media>
                                </Media>
                            </div>
                            <div className='col-md-1'>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-10 '>
                        {ListAudio}
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-10 audios'>
                        <AudioList />
                    </div>
                    <div className='col-md-1'>
                    </div>
                </div>
            </div>
        )
    }
}

export default Songs;