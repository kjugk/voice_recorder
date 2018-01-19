import * as React from 'react';
import { AppState, ArticlesState, ArticleItemState, PlayerState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as playerActions from '../actions/playerActions';

import { Player } from '../components/player/Player';

interface PlayerContainerProps {
  player: PlayerState;
  selectedArticle: ArticleItemState;
  pause: () => any;
  play: () => any;
  loadTrack: (url: string) => any;
}

class PlayerContainer extends React.Component<PlayerContainerProps> {
  public componentDidUpdate(prevProps: PlayerContainerProps) {
    const { selectedArticle, loadTrack } = this.props;

    if (!prevProps.selectedArticle && selectedArticle) {
      loadTrack('/audio/sample2.mp3');
    } else if (prevProps.selectedArticle.id !== this.props.selectedArticle.id) {
      loadTrack('/audio/sample2.mp3');
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
    pause: () => dispatch(playerActions.pause()),
    play: () => dispatch(playerActions.play()),
    loadTrack: (url: string) => dispatch(playerActions.loadTrack(url))
  };
};

const getSelectedArticle = (
  articles: ArticleItemState[],
  selectedId?: string
): ArticleItemState | undefined => {
  return articles.find((article) => article.id === selectedId);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
