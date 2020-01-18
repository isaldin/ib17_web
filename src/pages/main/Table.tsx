import React from 'react';
import { Table, Button, Popup } from 'semantic-ui-react';

import styles from './Table.scss';

import top10Artists from './topRatedArtists';
import { map } from 'ramda';

const TopArtistsTable = (): React.FunctionComponentElement<{}> => {
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
        {top10Artists.map((artist, idx) => (
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
                        trigger={<Button size="mini" icon="play" color="blue" />}
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
