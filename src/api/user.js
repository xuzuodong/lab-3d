import baseUrl from './baseUrl'
import axios from 'axios'

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
  }
}
