import baseUrl from './baseUrl'
import axios from 'axios'
import store from '../store/index'

export default {
  selectAllExperiments({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'experiment/selectAllExperiments'
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  selectExperimentByAlias({ alias, success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'experiment/selectExperimentByAlias?alias=' + alias,
      headers: { Authorization: store.state.user?.userInfo?.token }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  likeExperiment({ id, like, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'experiment/like',
      headers: { Authorization: store.state.user.userInfo.token },
      data: {
        experimentId: id,
        like
      }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  }
}
