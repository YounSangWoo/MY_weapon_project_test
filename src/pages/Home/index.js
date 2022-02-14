import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, FlatList, View } from 'react-native';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import styles from './styles';
import LiveStreamCard from './LiveStreamCard';
import Header from './Header';
import Footer from './Footer';

class Home extends React.Component {
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

  onPressLogout = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Login', { userName });
  };

  onPressPL = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Home', { userName });
  };

  onPressSL = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('SavedLive', { userName });
  };

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Streamer', { userName, roomName: userName });
  };

  onPressCardItem = (data) => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Viewer', { userName, data });
  };

  render() {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const { listLiveStream } = this.state;
    return (
      <View style={styles.container}>
        {/* header */}
        <Header userName={userName} />
        {/* Cardlist */}
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={2}
            contentContainerStyle={styles.flatList}
            data={listLiveStream}
            renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
            keyExtractor={(item) => item._id}
          />
        </View>
        <Footer
          onPressLiveStreamNow={this.onPressLiveStreamNow}
          onPressLogout={this.onPressLogout}
        />
      </View>
    );
  }
}

Home.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  route: null,
};

export default Home;
