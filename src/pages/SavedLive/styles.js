import { endsWith } from 'lodash';
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // ------header-----------
  headContainer: {
    flex: 1.5,
    backgroundColor: '#ECECEC',
  },

  userSpace: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  titleList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    margin: 10,
  },
  // --------main card list-----------
  flatList: {
    // width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  // --------footer-----------
  footContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
    paddingHorizontal: 15,
  },
  liveStreamButton: {
    justifyContent: 'center',
    backgroundColor: '#34495e',
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutButton: {
    justifyContent: 'center',
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    fontSize: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: '600',
  },
});

export default styles;
