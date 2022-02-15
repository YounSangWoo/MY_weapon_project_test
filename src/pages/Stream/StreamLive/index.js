import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';
import get from 'lodash/get';
import styled from 'styled-components';
import styles from '../../Home/styles';
import SocketManager from '../../../socketManager';
import LiveStreamCard from './LiveStreamCard';

class StreamLive extends React.Component {
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

        // Only include not cancelled live streams
    let newListLiveStream = [];
    for (let i = 0; i < listLiveStream.length; i++) {
      if (listLiveStream[i].liveStatus == 1) {
        newListLiveStream.push(listLiveStream[i])
      }
    }

    return (
      <Container>
        <FlatList
          data={newListLiveStream}
          renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.flatList}
        />
      </Container>
      // <Text style={{ color: 'black' }}>아무거나 보여줘</Text>
    );
  }
}

const Container = styled.View`
  margin-top: 5px;
`;

StreamLive.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

StreamLive.defaultProps = {
  route: null,
};
export default StreamLive;
