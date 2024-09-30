import React, { useState, useCallback } from "react";
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((term) => {

    // Debug log to check if search is triggered
    console.log('Searching for:', term); 

    Spotify.search(term).then(setSearchResults);
      // Debug log to check the results from API
      //console.log('Search results:', results);
      //setSearchResults(results); // Make sure searchResults is updated
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);
  // Saving the Playlist to a User's Account
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>Macowwwly</h1>
      <div className={styles["app-container"]}>
      {/*</div><div className="App">*/}
        <div className={styles["search-container"]}> 
          <SearchBar onSearch={search} />
          <div className={styles["search-results"]}>
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
          </div>
        </div>
        <div className={styles["playlist-container"]}>
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;


