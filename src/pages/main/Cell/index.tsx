import { map } from 'ramda';
import React from 'react';

import {
    TopRatedArtists_topRatedArtists as ArtistType,
    TopRatedArtists_topRatedArtists_tracks as TrackType
} from '@app/apollo/__generated__/TopRatedArtists';
import { PlayButton } from '@app/components/PlaybackButtons';

import {
    Artist, Container, JudgesRating, Location, Name, PopularRating, Ratings, Tracks
} from './Style';

interface PropsType {
  artist: ArtistType;
  onPlayPauseClick: (track: TrackType) => void;
}

const Cell: React.FC<PropsType> = ({ artist, onPlayPauseClick }) => {
  const handlePlayPauseClick = (track: TrackType) => () => onPlayPauseClick(track);

  return (
    <Container>
      <Artist>
        <Name>{artist.name}</Name>
        <Location>{artist.location}</Location>
      </Artist>
      <Tracks>
        {map(
          track => (
            <PlayButton key={track.id} onClick={handlePlayPauseClick(track)} />
          ),
          artist.tracks,
        )}
      </Tracks>
      <Ratings>
        <JudgesRating>{artist.overallJudgesRating}</JudgesRating>
        <PopularRating>{artist.overallPopularRating}</PopularRating>
      </Ratings>
    </Container>
  );
};

export default Cell;
