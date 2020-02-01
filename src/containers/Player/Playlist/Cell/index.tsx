import React from 'react';

import { PlayButton } from '@app/components/PlaybackButtons';

import { PlaylistItemType } from '../../Playlist';
import { Artist, Container, Content, Track, TrackName } from './Style';

interface PropsType {
  playlistId: string;
  track: PlaylistItemType;
  playingTrackId: string | null;
  playingTrackStatus: 'playing' | 'paused' | null;
  onPlayClick: (item: PlaylistItemType) => void;
  onPauseClick: () => void;
}

const PlaylistCell: React.FC<PropsType> = (props: PropsType) => {
  const { track } = props;

  let playingTrackId: string | null = null;
  if (props.playingTrackId && props.playingTrackStatus === 'playing') {
    playingTrackId = props.playingTrackId;
  }

  return (
    <Container>
      <Content>
        <PlayButton
          onClick={() => {
            /* */
          }}
        />
        <Track>
          <Artist>{track.artist}</Artist>
          <TrackName>{track.trackName}</TrackName>
        </Track>
      </Content>
    </Container>
  );
};

export default PlaylistCell;
