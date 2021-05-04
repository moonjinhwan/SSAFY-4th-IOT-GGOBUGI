import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    scannedDevices: [],
    scannedUid: [],
    registedDevices: [],
    registedUid: [],
    nowTab: 0
    // regScannedDevices: [],
    // newScannedDevices: [],
    // serverSocket: io('j4c108.p.ssafy.io:8080'),
    // serverSocket: io('localhost:12001'),
  },
  getters: {
    getScannedDevices(state) {
      return state.scannedDevices
    },
    getScannedUid(state) {
      return state.scannedUid
    },
    getRegistedDevices(state) {
      return state.registedDevices
    },
    getRegistedUid(state) {
      return state.registedUid
    },
    getNowTab(state) {
      return state.nowTab
    }

  },
  mutations: {
    setScannedDevices(state, devices) {
      let tempDevices = []
      let idx = 0
      for (let i in devices) {
        tempDevices.push({
          uid: devices[i][0],
          name: '알 수 없는 기기('+idx+')',
          net_status: devices[i][1],
          dev_status: devices[i][2],
        })
        idx += 1
      }
      state.scannedDevices = tempDevices
    },
    setScannedUid(state, uid) {
      if (!state.scannedUid.includes(uid)) {
        state.scannedUid.push(uid)
      }
    },
    setRegistedDevices(state, devices) {
      state.registedDevices = devices
    },
    setRegistedUid(state, uid) {
      state.registedUid.push(uid)
    },
    setNowTab(state, now) {
      state.nowTab = now
    }
  },
  actions: {
    //data = ""
    sendStateRefresh(context, serverSocket) {
      console.log("state refresh")
      serverSocket.emit('sendStateRefreshToServer', 'data')
    },
    
    //data = ""
    sendScanOn(context, serverSocket) {
      console.log("scan on")
      serverSocket.emit('sendScanOnToServer', 'data')
    },
    // data = ""
    sendScanOff(context, serverSocket) {
      console.log("scan off")
      serverSocket.emit('sendScanOffToServer', 'data')
    },

    //data = ""
    sendGetRegObj(context, serverSocket) {
      console.log("get registed obj")
      serverSocket.emit('sendGetRegObjToServer', 'data')
    },

    //data = "name"
    sendObjOn(context, serverSocket, name) {
      console.log("obj on")
      serverSocket.emit('sendObjOnToServer', name)
    },
    //data = "name"
    sendObjOff(context, serverSocket, name) {
      console.log("obj off")
      serverSocket.emit('sendObjOffToServer', name)
    },

    //data = ['uid', 'name', [0, 0]]
    sendRegistObj(context, serverSocket, data) {
      console.log("regist obj")
      serverSocket.emit('sendRegistObjToServer', data)
      console.log("디바이스추가완료")
    },
    //data = "name"
    sendRemoveObj(context, serverSocket, name) {
      console.log("remove obj")
      serverSocket.emit('sendRemoveObjToServer', name)
    }
    
  },
})
