import { map } from 'ramda';
import React from 'react';

import PlaylistCell from './Cell';
import { Container, Content } from './Style';

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
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};

export default Playlist;
