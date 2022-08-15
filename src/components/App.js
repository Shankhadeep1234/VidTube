import React, { Component } from "react";

import youtube from "../apis/youtube";

import SearchBar from "./SearchBar";
import VideoList from "./VideoList";

class App extends Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit("Javascript");
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video,
    });
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: "10px" }}>
        <SearchBar onFormTermSubmit={this.onTermSubmit} />
        <VideoList
          onSelectedVideo={this.onVideoSelect}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
