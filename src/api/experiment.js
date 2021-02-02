import baseUrl from './baseUrl'
import axios from 'axios'

export default {
  selectAllExperiments({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'experiment/selectAllExperiments',
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  }
}
