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
  resetPlayer: () => any;
}

class PlayerContainer extends React.Component<PlayerContainerProps> {
  public componentDidUpdate(prevProps: PlayerContainerProps) {
    const { selectedArticle, loadTrack, resetPlayer } = this.props;

    // トラック削除
    if (!selectedArticle) {
      if (prevProps.selectedArticle) {
        resetPlayer();
      }
      return;
    }

    // 最初の再生
    if (!prevProps.selectedArticle && selectedArticle) {
      loadTrack(selectedArticle.id);
      return;
    }

    // トラック切り替え
    if (prevProps.selectedArticle.id !== this.props.selectedArticle.id) {
      loadTrack(selectedArticle.id);
      return;
    }
  }

  public componentWillUnmount() {
    this.props.resetPlayer();
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
    loadTrack: (url: string) => dispatch(playerActions.loadTrack(url)),
    resetPlayer: () => dispatch(playerActions.resetPlayer())
  };
};

const getSelectedArticle = (
  articles: ArticleItemState[],
  selectedId?: string
): ArticleItemState | undefined => {
  return articles.find((article) => article.id === selectedId);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
