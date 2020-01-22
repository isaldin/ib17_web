import React, { ReactNode } from 'react';
import { Button, Header } from 'semantic-ui-react';

import { PlaylistItemType } from '@app/components/Playlist';

import styles from './Player.scss';

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
        return <Button icon="pause" onClick={this.handlePauseClicked} />;

      default:
        return <Button icon="play" onClick={this.handlePlayClicked} />;
    }
  };

  render(): JSX.Element {
    const { track } = this.props;

    return (
      <div className={styles.playerContainer}>
        <div className={styles.wrapper}>
          <Header as="h5" color="grey" className={styles.trackName}>
            <b className={styles.artist}>{track?.artist || 'Не выбран'}</b>
            {` ${track?.trackName || ''}`}
          </Header>
          <div className={styles.progressWrapper} onClick={this.handleProgressBarClick}>
            <div
              color="blue"
              className={styles.progress}
              style={{ width: `${this.calculatePlayedDuration()}%` }}
            />
          </div>
          <div className={styles.buttonsWrapper}>
            <Button.Group icon size="tiny" color="blue">
              <Button icon="backward" onClick={this.props.onBackwardClicked} />
              {this.renderPlayPauseButton(this.state.status)}
              <Button icon="forward" onClick={this.props.onForwardClicked} />
            </Button.Group>
            <Button
              icon="list"
              size="tiny"
              color="blue"
              onClick={this.props.togglePlaylistVisibility}
            />
            <Header as="h5" color="grey" className={styles.timings}>
              {`${_secondsInHumanReadFormat(
                this.state.currentTime || 0,
              )}/${_secondsInHumanReadFormat(this.state.duration || 0)}`}
            </Header>
          </div>
          <audio ref={this.setPlayerRef} src={track?.url || ''} preload="auto" autoPlay={!!track} />
        </div>
      </div>
    );
  }
}

export default Player;
