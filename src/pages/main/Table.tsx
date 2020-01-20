import React from 'react';
import { Table, Button, Popup } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import GetPlaylistQuery from './getPlaylistQuery.graphql';
import { TopRatedArtists_topRatedArtists as Artist } from '@app/apollo/__generated__/TopRatedArtists';
import { GetPlaylistQuery as GetPlaylistQueryType } from '@app/apollo/__generated__/GetPlaylistQuery';
import styles from './Table.scss';

import { map } from 'ramda';

interface PropsType {
  artists: Artist[];
}

const TopArtistsTable = (props: PropsType): React.FunctionComponentElement<PropsType> => {
  const { data, client } = useQuery<GetPlaylistQueryType>(GetPlaylistQuery);

  console.log({ data });

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
                            onClick={(): void => {
                              client.writeData<GetPlaylistQueryType>({
                                data: { currentPlaylist: [track] },
                              });
                            }}
                            size="mini"
                            icon="play"
                            color="blue"
                          />
                        }
                        content={`${track.round} раунд`}
                        basic
                        size="mini"
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
