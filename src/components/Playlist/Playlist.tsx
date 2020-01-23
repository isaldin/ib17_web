import React from 'react';
import { Segment, List } from 'semantic-ui-react';
import { map } from 'ramda';

import PlaylistCell from './Cell';
import styles from './Playlist.scss';

export interface PlaylistItemType {
  trackId: string;
  artist: string;
  trackName: string;
  url: string | null;
}

interface PropsType {
  playlistId: string;
  tracks: PlaylistItemType[];
  playingTrackId: string | null;
  playingTrackStatus: 'playing' | 'paused' | null;
  onPlayClick: (item: PlaylistItemType) => void;
  onPauseClick: () => void;
}

const Playlist = (props: PropsType): React.FunctionComponentElement<PropsType> => {
  return (
    <Segment className={styles.segment}>
      <List divided relaxed>
        {map(
          track => (
            <PlaylistCell
              key={track.trackId}
              playlistId={props.playlistId}
              track={track}
              playingTrackId={props.playingTrackId}
              playingTrackStatus={props.playingTrackStatus}
              onPlayClick={props.onPlayClick}
              onPauseClick={props.onPauseClick}
            />
          ),
          props.tracks,
        )}
      </List>
    </Segment>
  );
};

export default Playlist;
