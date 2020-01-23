import React from 'react';
import { Table, Button, Popup } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import GetPlaylistQuery from '@app/containers/Player/currentPlaylist.graphql';
import {
  TopRatedArtists_topRatedArtists as Artist,
  TopRatedArtists_topRatedArtists_tracks as Track,
} from '@app/apollo/__generated__/TopRatedArtists';
import { CurrentPlaylistQuery as CurrentPlaylistQueryType } from '@app/apollo/__generated__/CurrentPlaylistQuery';
import styles from './Table.scss';

import { map, includes, find, propEq } from 'ramda';

interface PropsType {
  artists: Artist[];
}

const TopArtistsTable = (props: PropsType): React.FunctionComponentElement<PropsType> => {
  const { client, data } = useQuery<CurrentPlaylistQueryType>(GetPlaylistQuery);

  const playlistItems = data?.currentPlaylist?.tracks || [];

  const addToPlaylistAndPlay = (track: Track): void => {
    // TODO: use mutation here
    client.writeData<CurrentPlaylistQueryType>({
      data: {
        currentPlaylist: {
          __typename: 'Playlist',
          id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
          tracks: [track],
        },
      },
    });
    localStorage.setItem('playlist', JSON.stringify([track]));
  };

  const addToPlaylistQueue = (track: Track): void => {
    if (find(propEq('id', track.id), playlistItems)) {
      return;
    }

    // TODO: use mutation here
    client.writeData<CurrentPlaylistQueryType>({
      data: {
        currentPlaylist: {
          __typename: 'Playlist',
          id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
          tracks: [...playlistItems, track],
        },
      },
    });
    localStorage.setItem('playlist', JSON.stringify([...playlistItems, track]));
  };

  return (
    <Table singleLine basic>
      <Table.Header>
        <Table.Row className={styles.row}>
          <Table.HeaderCell width={1} textAlign="left">
            #
          </Table.HeaderCell>
          <Table.HeaderCell width={5}>Имя</Table.HeaderCell>
          <Table.HeaderCell width={4}>Город</Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="right">
            Судьи
          </Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="right">
            Зрители
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.artists.map((artist: Artist, idx) => (
          <Table.Row key={artist.id} className={styles.row}>
            <Table.Cell rowSpan="1" textAlign="left">
              {++idx}
            </Table.Cell>

            <Table.Cell>
              <div className={styles.artistRow}>
                <b>{artist.name}</b>
                <div className={styles.buttons}>
                  {map(
                    track => (
                      <Popup
                        key={track.id}
                        trigger={
                          <Button
                            onClick={(): void => addToPlaylistAndPlay(track)}
                            size="mini"
                            icon="play"
                            color="blue"
                          />
                        }
                        content={
                          <Button
                            size="mini"
                            color="blue"
                            onClick={(): void => addToPlaylistQueue(track)}>
                            В очередь
                          </Button>
                        }
                        size="mini"
                        hoverable
                        mouseEnterDelay={500}
                      />
                    ),
                    artist.tracks,
                  )}
                </div>
              </div>
            </Table.Cell>

            <Table.Cell>{artist.location}</Table.Cell>

            <Table.Cell textAlign="right">
              <b>{artist.overallJudgesRating}</b>
            </Table.Cell>

            <Table.Cell textAlign="right">{artist.overallPopularRating}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TopArtistsTable;
