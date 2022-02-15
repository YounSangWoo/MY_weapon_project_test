import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import styled from 'styled-components';
import SocketManager from '../../../socketManager';
import styles from '../styles';
import LiveStreamCard from './LiveStreamCard';

class SavedLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiveStream: [],
    };
  }

  componentDidMount() {
    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ listLiveStream: data });
    });
  }

  onPressCardItem = (data) => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Viewer', { userName, data });
  };

  render() {
    const { listLiveStream } = this.state;
    return (
      <Page>
        <FlatList
          numColumns={2}
          contentContainerStyle={styles.flatList}
          data={listLiveStream}
          renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
          keyExtractor={(item) => item._id}
        />
      </Page>
    );
  }
}

const Page = styled.View`
  padding: 10px 0 50px;
`;
SavedLive.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

SavedLive.defaultProps = {
  route: null,
};
export default SavedLive;
