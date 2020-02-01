import React, { ReactNode } from 'react';

import {
    ListButton, NextButton, PauseButton, PlayButton, PrevButton
} from '@app/components/PlaybackButtons';

import { PlaylistItemType } from '../Playlist';
import {
    Artist, Buttons, Container, Content, PlaybackControls, Progress, ProgressBar, Timing, TrackInfo,
    TrackName
} from './Style';

export type PlayerStatusType = 'playing' | 'paused' | null;

interface StateType {
  currentTime?: number;
  duration?: number;
  status: PlayerStatusType;
}

interface PropsType {
  track: PlaylistItemType | null;
  togglePlaylistVisibility: () => void;
  onPlayingStatusChange: (playingStatus: PlayerStatusType) => void;
  onPlayingTrackEnd: () => void;
  onBackwardClicked: () => void;
  onForwardClicked: () => void;
}

const _secondsInHumanReadFormat = (secs: number): string => {
  const minutes = Math.floor(secs / 60);
  const minutesStr = (minutes > 10 ? '' : '0') + minutes.toString();
  const secondsInt = secs - minutes * 60;
  const secondsStr = (secondsInt > 10 ? '' : '0') + secondsInt.toString();
  const seconds = secondsStr.substr(0, 2);

  return minutesStr + ':' + seconds;
};

class Player extends React.Component<PropsType, StateType> {
  state: StateType = {
    status: null,
  };

  mounted = false;

  player: HTMLAudioElement | null = null;

  componentDidMount(): void {
    this.mounted = true;
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  play(): void {
    this.player && this.player.play();
  }

  pause(): void {
    this.player && this.player.pause();
  }

  setStateSafely(partialState: Partial<StateType>, cb?: () => void): void {
    if (this.mounted) {
      this.setState(currentState => ({ ...currentState, ...partialState }), cb);
    }
  }

  setPlayerRef = (element: HTMLAudioElement): void => {
    this.player = element;

    if (!this.player) {
      return;
    }

    this.player.ontimeupdate = (ev: Event): void => {
      const target = ev.target as HTMLAudioElement;
      const currentTime = target && target.currentTime;
      const duration = target && target.duration;

      this.setStateSafely({ currentTime, duration });
    };

    this.player.onplay = (_ev: Event): void => {
      this.setStateSafely({ status: 'playing' }, () => {
        this.props.onPlayingStatusChange(this.state.status);
      });
    };

    this.player.onpause = (_ev: Event): void => {
      this.setStateSafely({ status: 'paused' }, () => {
        this.props.onPlayingStatusChange(this.state.status);
      });
    };

    this.player.onended = (_ev: Event): void => {
      this.setStateSafely(
        {
          currentTime: undefined,
          duration: undefined,
          status: null,
        },
        () => {
          this.props.onPlayingTrackEnd();
        },
      );
    };
  };

  handlePlayClicked = (): void => {
    if (!this.props.track) {
      return;
    }
    this.player?.play();
  };

  handlePauseClicked = (): void => {
    this.player?.pause();
  };

  handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const el = event.currentTarget as HTMLDivElement;
    const clickedPosition = event.nativeEvent.offsetX;
    const widthOfElement = el.getClientRects()[0].width;
    const proportion = clickedPosition / widthOfElement;
    const { duration } = this.state;

    if (duration && this.player) {
      this.player.currentTime = duration * proportion;
    }
  };

  calculatePlayedDuration = (): number => {
    const { currentTime, duration } = this.state;
    if (!currentTime || !duration) {
      return 0;
    }

    return (currentTime / duration) * 100;
  };

  renderPlayPauseButton = (playerStatus: PlayerStatusType): ReactNode => {
    switch (playerStatus) {
      case 'playing':
        return <PauseButton onClick={this.handlePauseClicked} />;

      default:
        return <PlayButton onClick={this.handlePlayClicked} />;
    }
  };

  render(): JSX.Element {
    const { track } = this.props;

    return (
      <Container>
        <Content>
          <TrackInfo>
            <Artist>{track?.artist || 'Не выбран'}</Artist>
            <TrackName>{` ${track?.trackName || ''}`}</TrackName>
          </TrackInfo>
          <ProgressBar>
            <Progress progress={this.calculatePlayedDuration()} />
          </ProgressBar>
          <Buttons>
            <PlaybackControls>
              <PrevButton onClick={this.props.onBackwardClicked} />
              {this.renderPlayPauseButton(this.state.status)}
              <NextButton onClick={this.props.onForwardClicked} />
            </PlaybackControls>
            <ListButton onClick={this.props.togglePlaylistVisibility} />
            <Timing>
              {`${_secondsInHumanReadFormat(
                this.state.currentTime || 0,
              )}/${_secondsInHumanReadFormat(this.state.duration || 0)}`}
            </Timing>
          </Buttons>
          <audio ref={this.setPlayerRef} src={track?.url || ''} preload="auto" autoPlay={!!track} />
        </Content>
      </Container>
    );
  }
}

export default Player;
