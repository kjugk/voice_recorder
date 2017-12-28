import * as React from 'react';
import { AppState, ArticlesState, ArticleItemState, PlayerState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as PlayerActions from '../actions/PlayerActions';

import { Player } from '../components/player/Player';

interface PlayerProps {
  player: PlayerState;
  selectedArticle: ArticleItemState;
  pause: () => any;
  play: () => any;
  load: (url: string) => any;
}

class PlayerContainer extends React.Component<PlayerProps> {
  public componentDidUpdate(prevProps: PlayerProps) {
    if (!prevProps.selectedArticle && this.props.selectedArticle) {
      this.props.load('http://localhost:3000/audio/sample.mp3');
    } else if (prevProps.selectedArticle.id !== this.props.selectedArticle.id) {
      this.props.load('http://localhost:3000/audio/sample.mp3');
    }
  }

  public render() {
    const { selectedArticle, player, play, pause } = this.props;

    if (!selectedArticle) {
      return null;
    }

    return (
      <Player
        isLoading={player.isLoading}
        isPlaying={player.isPlaying}
        title={selectedArticle.title}
        duration={player.duration}
        curPos={player.curPos}
        onPlay={play}
        onPause={pause}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    player: state.player,
    selectedArticle: getSelectedArticle(state.articles.items, state.articles.selectedId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    pause: () => dispatch(PlayerActions.pause()),
    play: () => dispatch(PlayerActions.play()),
    load: (url: string) => dispatch(PlayerActions.loadTrack(url))
  };
};

const getSelectedArticle = (
  articles: ArticleItemState[],
  selectedId?: number
): ArticleItemState | undefined => {
  return articles.find((article) => article.id === selectedId);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
