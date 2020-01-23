import React, { useState } from 'react';
import { List, Button } from 'semantic-ui-react';

import { PlayerConsumer } from '@app/containers/Player/PlayerProvider';

import { PlaylistItemType } from './Playlist';
import styles from './Cell.scss';

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

  const [isManageButtonsShown, setShowManageButtons] = useState(false);

  const showManageButtons = (): void => {
    setShowManageButtons(true);
  };

  const hideManageButtons = (): void => {
    setShowManageButtons(false);
  };

  return (
    <PlayerConsumer>
      {({ moveTrackUp }) => (
        <List.Item
          key={track.trackId}
          onMouseEnter={showManageButtons}
          onMouseLeave={hideManageButtons}>
          <>
            {isManageButtonsShown && (
              <div className={styles.manageButtons}>
                <Button.Group size="mini">
                  <Button
                    icon="long arrow alternate up"
                    size="mini"
                    onClick={() => moveTrackUp(track.trackId, props.playlistId)}
                  />
                  <Button icon="long arrow alternate down" size="mini" />
                </Button.Group>
                <Button color="red" icon="remove" size="mini" />
              </div>
            )}
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
          </>
        </List.Item>
      )}
    </PlayerConsumer>
  );
};

export default PlaylistCell;
