import React, { createRef } from 'react';

import { Player, PlayerStatusType } from '@app/components/Player';
import { Playlist, PlaylistItemType } from '@app/components/Playlist';
import { findIndex, propEq } from 'ramda';

export interface PropsType {
  tracks: PlaylistItemType[];
}

interface StateType {
  isPlaylistVisible: boolean;
  currentTrack: PlaylistItemType | null;
  playingStatus: PlayerStatusType;
}

class PlayerContainer extends React.Component<PropsType, StateType> {
  playerRef = createRef<Player>();

  state: StateType = {
    isPlaylistVisible: true,
    currentTrack: null,
    playingStatus: null,
  };

  componentDidUpdate(_: PropsType, prevState: StateType): void {
    if (
      this.props.tracks.length === 1 &&
      prevState.currentTrack?.trackId !== this.props.tracks[0]?.trackId
    ) {
      this.setState({ currentTrack: this.props.tracks[0] }, () => {
        const player = this.playerRef.current;
        player?.play();
      });
    }
  }

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
      this.props.tracks,
    );

    if (currentTrackIndex > -1 && currentTrackIndex + 1 < this.props.tracks.length) {
      this.setState({ currentTrack: this.props.tracks[currentTrackIndex + 1] });
    } else if (
      // if current track is last in list, clear player
      currentTrackIndex + 1 ===
      this.props.tracks.length
    ) {
      this.setState({ currentTrack: null });
    }
  };

  _playPrev = (): void => {
    const currentTrackIndex = findIndex(
      propEq('trackId', this.state.currentTrack?.trackId),
      this.props.tracks,
    );
    if (currentTrackIndex > 0) {
      this.setState({ currentTrack: this.props.tracks[currentTrackIndex - 1] });
    }
  };

  render(): JSX.Element {
    return (
      <>
        {this.state.isPlaylistVisible && (
          <Playlist
            tracks={this.props.tracks}
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
