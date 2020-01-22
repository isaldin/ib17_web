import React from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import { map } from 'ramda';

import styles from './Playlist.scss';

export interface PlaylistItemType {
  trackId: string;
  artist: string;
  trackName: string;
  url: string | null;
}

interface PropsType {
  tracks: PlaylistItemType[];
  playingTrackId: string | null;
  playingTrackStatus: 'playing' | 'paused' | null;
  onPlayClick: (item: PlaylistItemType) => void;
  onPauseClick: () => void;
}

const Playlist = (props: PropsType): React.FunctionComponentElement<PropsType> => {
  let playingTrackId: string | null;
  if (props.playingTrackId && props.playingTrackStatus === 'playing') {
    playingTrackId = props.playingTrackId;
  }

  return (
    <Segment>
      <List divided relaxed>
        {map(
          track => (
            <List.Item key={track.trackId}>
              <List.Content className={styles.cell}>
                {track.trackId === playingTrackId ? (
                  <Button color="blue" icon="pause" size="mini" onClick={props.onPauseClick} />
                ) : (
                  <Button
                    color="blue"
                    icon="play"
                    size="mini"
                    onClick={(): void => props.onPlayClick(track)}
                  />
                )}
                <div className={styles.trackInfoWrapper}>
                  <List.Header className={styles.artist}>{track.artist}</List.Header>
                  <span className={styles.track}>{track.trackName}</span>
                </div>
              </List.Content>
            </List.Item>
          ),
          props.tracks,
        )}
      </List>
    </Segment>
  );
};

export default Playlist;
