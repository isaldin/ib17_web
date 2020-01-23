import { createContext } from 'react';

interface PlayerContextType {
  moveTrackUp: (trackId: string, playlistId: string) => void;
  moveTrackDown: (trackId: string, playlistId: string) => void;
  deleteTrackFromPlaylist: (trackId: string, playlistId: string) => void;
}

const { Provider, Consumer } = createContext<PlayerContextType>({
  moveTrackUp: (_trackId: string, _playlistId: string): void => {
    throw new Error('implement methods in provider component');
  },
  moveTrackDown: (_trackId: string, _playlistId: string): void => {
    throw new Error('implement methods in provider component');
  },
  deleteTrackFromPlaylist: (_trackId: string, _playlistId: string): void => {
    throw new Error('implement methods in provider component');
  },
});

export { Provider as PlayerProvider };
export { Consumer as PlayerConsumer };
