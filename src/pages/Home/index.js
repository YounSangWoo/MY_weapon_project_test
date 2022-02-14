import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, FlatList, View } from 'react-native';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import styles from './styles';
import LiveStreamCard from './LiveStreamCard';

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
        <View style={styles.headContainer}>
          <View style={styles.userSpace}>
            <Text style={styles.welcomeText}>Welcome : {userName}</Text>
          </View>
          <View style={styles.titleList}>
            <TouchableOpacity onPress={this.onPressPL}>
              <Text style={styles.selectedTitle}>진행중인 라이브</Text>
            </TouchableOpacity>

            <Text style={styles.title}>다가오는 라이브</Text>

            <TouchableOpacity onPress={this.onPressSL}>
              <Text style={styles.title}>지나간 라이브</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cardlist */}
        <View style={{ flex: 10 }}>
          <FlatList
            numColumns={2}
            contentContainerStyle={styles.flatList}
            data={listLiveStream}
            renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
            keyExtractor={(item) => item._id}
          />
        </View>
        {/* footer */}
        <View style={styles.footContainer}>
          <TouchableOpacity style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}>
            <Text style={styles.textButton}>방송 시작</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={this.onPressLogout}>
            <Text style={styles.textButton}>로그아웃</Text>
          </TouchableOpacity>
        </View>
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
