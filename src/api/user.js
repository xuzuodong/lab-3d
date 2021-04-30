import baseUrl from './baseUrl'
import axios from 'axios'
import store from '../store/index'

export default {
  login({ username, password, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/login',
      data: { username, password },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  register({ username, password, userType, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/register',
      data: { username, password, userType },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  selectMyClasses({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'user/selectMyClasses',
      headers: { Authorization: store.state.user.userInfo.token },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  joinClass({ classCode, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/joinClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classCode },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  quitClass({ classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/quitClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  createClass({ classInfo, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'teacher/createClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { ...classInfo },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  startExperiment({ experimentId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/startExperiment',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { experimentId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  deleteClass({ classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'teacher/deleteClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  submitBehavior({ kexperimentId, name, type, content, isCorrect, correctContent, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/submitBehavior',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { kexperimentId, name, type, content, correctContent, isCorrect },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  updateClassInfo({ classInfo, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'teacher/updateClassInfo',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { ...classInfo },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  finishKexperiment({ kexperimentId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/finishKexperiment',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { kexperimentId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  recordTestTime({ experimentId, testName, time, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/recordTestTime',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { experimentId, testName, time },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  selectKexperimentByClass({ classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/selectKexperimentByClass',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  getClassById({ classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'teacher/getClassById',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { classId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  selectMyKexperiment({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'behavior/selectMyKexperiment',
      headers: { Authorization: store.state.user.userInfo.token },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  removeUser({ userId, classId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'teacher/removeUser',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { userId, classId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  getKexperimentEvaluation({ kexperimentId, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'behavior/getKexperimentEvaluation',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { kexperimentId },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },

  getUserInfo({ success, failure }) {
    axios({
      method: 'get',
      url: baseUrl + 'user/getUserInfo',
      headers: { Authorization: store.state.user.userInfo.token },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },
  
  updateUserInfo({ passWord, phoneNumber, realName, sex, grade, school, success, failure }) {
    axios({
      method: 'post',
      url: baseUrl + 'user/updateUserInfo',
      headers: { Authorization: store.state.user.userInfo.token },
      data: { passWord, phoneNumber, realName, sex, grade, school },
    })
      .then((res) => success(res))
      .catch((res) => failure(res))
  },
}
