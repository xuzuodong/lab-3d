import baseUrl from './baseUrl'
import axios from 'axios'
import store from '../store/index'

export default {
  login({ username, password, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/login',
      data: { username, password }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  register({ username, password, userType, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/register',
      data: { username, password, userType }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  selectMyClasses({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'user/selectMyClasses',
      headers: { Authorization: store.state.user.userInfo.token }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  joinClass({ classCode, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/joinClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classCode }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  quitClass({ classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/quitClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classId }
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  }
}
