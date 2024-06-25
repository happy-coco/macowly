import React, { useState, useCallback } from "react";
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song1', artist: 'Artist1', album: 'Album1' },
    { id: 2, name: 'Song2', artist: 'Artist2', album: 'Album2' },
  ]);
  const [playlistName, setPlaylistName] = useState(["New Playlist"]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
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

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div className={styles.app}>
      <h1>Macowwwly</h1>
      <SearchBar onSearch={search} />
      <div className={styles.appBody}>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist 
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist} />
      </div>
    </div>
  );
}

export default App;

