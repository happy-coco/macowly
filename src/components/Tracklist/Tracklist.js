import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track';

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {props.tracks.map(track => {
        return (
          <Track 
            key={track.id} 
            track={track} 
            onAdd={props.onAdd} 
            isRemoval={props.isRemoval}
            onRemove={props.onRemove}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
