import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBS0rd4wYHYqJo3sNWTeP8IFMKFs_5YJ6Q';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('criss cross wanderer');

    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0],
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 500);

        return (
            <div className="index-page">
                <div>
                    <img src='download.png'></img>
                </div>
                <div><SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));