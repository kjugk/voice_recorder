/*
  TODO: selectedArticle が undef => articleに変わった時に、audioファイルをload して、自動playする。
*/

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
}

class PlayerContainer extends React.Component<PlayerProps> {
  public componentDidUpdate(prevProps: PlayerProps) {
    if (!prevProps.selectedArticle && this.props.selectedArticle) {
      alert('start playing!');
    } else if (prevProps.selectedArticle.id !== this.props.selectedArticle.id) {
      alert('change track!');
    }
  }

  public render() {
    const { selectedArticle, player, play, pause } = this.props;

    if (!selectedArticle) {
      return null;
    }

    return (
      <Player
        isPlaying={player.isPlaying}
        title={selectedArticle.title}
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
    play: () => dispatch(PlayerActions.play())
  };
};

const getSelectedArticle = (
  articles: ArticleItemState[],
  selectedId?: number
): ArticleItemState | undefined => {
  return articles.find((article) => article.id === selectedId);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
