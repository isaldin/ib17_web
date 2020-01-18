import React, { createRef } from 'react';

import { Player, PlayerStatusType } from '@app/components/Player';
import { Playlist, PlaylistItemType } from '@app/components/Playlist';
import { findIndex, propEq } from 'ramda';

const tracks = [
  {
    trackId: 'VHJhY2s6NTAxOA==',
    trackName: 'Раунд 1',
    artist: 'MC с Марса',
    url: 'https://ib17.hip-hop.ru/upload/music/ib17_r1_mcsmarsa_83cc4a1.mp3',
  },
  {
    trackId: 'VHJhY2s6MTA3ODk=',
    trackName: 'Раунд 2',
    artist: 'MC с Марса',
    url: 'https://ib17.hip-hop.ru/upload/music/ib17_r2_mcsmarsa_e055698.mp3',
  },
  {
    trackId: 'VHJhY2s6MTEwMzY=',
    trackName: 'Раунд 3',
    artist: 'MC с Марса',
    url: 'https://ib17.hip-hop.ru/upload/music/ib17_r3_mcsmarsa_84f3f8d.mp3',
  },
];

interface StateType {
  isPlaylistVisible: boolean;
  currentTrack: PlaylistItemType | null;
  playingStatus: PlayerStatusType;
}

class PlayerContainer extends React.Component<{}, StateType> {
  playerRef = createRef<Player>();

  state: StateType = {
    isPlaylistVisible: true,
    currentTrack: null,
    playingStatus: null,
  };

  handleTogglePlaylistVisibility = (): void => {
    this.setState(prevState => ({ isPlaylistVisible: !prevState.isPlaylistVisible }));
  };

  handlePlayListItemPlayClick = (playlistItem: PlaylistItemType): void => {
    this.setState({ currentTrack: playlistItem }, () => {
      if (this.state.currentTrack === playlistItem) {
        const player = this.playerRef.current;
        player?.play();
      }
    });
  };

  handlePlaylistItemPauseClick = (): void => {
    const player = this.playerRef.current;
    player?.pause();
  };

  handlePlayingStatusChange = (playingStatus: PlayerStatusType): void => {
    this.setState({ playingStatus });
  };

  handlePlayingTrackEnded = (): void => {
    this._playNext();
  };

  handleBackwardClicked = (): void => {
    this._playPrev();
  };

  handleForwardClicked = (): void => {
    this._playNext();
  };

  _playNext = (): void => {
    const currentTrackIndex = findIndex(
      propEq('trackId', this.state.currentTrack?.trackId),
      tracks,
    );

    if (currentTrackIndex > -1 && currentTrackIndex + 1 < tracks.length) {
      this.setState({ currentTrack: tracks[currentTrackIndex + 1] });
    } else if (
      // if current track is last in list, clear player
      currentTrackIndex + 1 ===
      tracks.length
    ) {
      this.setState({ currentTrack: null });
    }
  };

  _playPrev = (): void => {
    const currentTrackIndex = findIndex(
      propEq('trackId', this.state.currentTrack?.trackId),
      tracks,
    );
    if (currentTrackIndex > 0) {
      this.setState({ currentTrack: tracks[currentTrackIndex - 1] });
    }
  };

  render(): JSX.Element {
    return (
      <>
        {this.state.isPlaylistVisible && (
          <Playlist
            tracks={tracks}
            onPlayClick={this.handlePlayListItemPlayClick}
            onPauseClick={this.handlePlaylistItemPauseClick}
            playingTrackId={this.state.currentTrack?.trackId || null}
            playingTrackStatus={this.state.playingStatus}
          />
        )}
        <Player
          track={this.state.currentTrack}
          togglePlaylistVisibility={this.handleTogglePlaylistVisibility}
          onPlayingStatusChange={this.handlePlayingStatusChange}
          onPlayingTrackEnd={this.handlePlayingTrackEnded}
          onBackwardClicked={this.handleBackwardClicked}
          onForwardClicked={this.handleForwardClicked}
          ref={this.playerRef}
        />
      </>
    );
  }
}

export default PlayerContainer;
