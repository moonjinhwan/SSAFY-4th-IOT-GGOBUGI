<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">
        GGOBUGI
      </h1>
    </v-card-title>

    <v-tabs
      background-color="transparent"
      color="basil"
      grow
      v-model="active_tab"
    >
      <v-tab v-for="tab of tabs" :key="tab.id" @click="goTo(tab.name)">
        {{ tab.name }}
      </v-tab>
      <!-- <v-tab @click="status()" key="1">
        <router-link to="/status" class="tab--decor">현재 상태</router-link>
      </v-tab>
      <v-tab @click="security()" key="2">
        <router-link to="/security" class="tab--decor">방범모드</router-link>
      </v-tab>
      <v-tab @click="myDevice()" key="3">
        <router-link to="/my-device" class="tab--decor">내 디바이스</router-link>
      </v-tab> -->
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'NavBar',
  data() {
    return {
      active_tab: '',
      tabs: [
        { id: 0, name: '현재 상태' },
        { id: 1, name: '방범 모드' },
        { id: 2, name: '내 디바이스' },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'getServerSocket',
      'getRegScannedDevices',
      'getNewScannedDevices',
      'getScannedDevices',
      'getRegistedDevices',
      'getNowTab',
    ]),
  },
  methods: {
    ...mapMutations([
      'setScannedDevices',
      'setRegistedDevices',
      'setScannedUid',
      'setNowTab',
    ]),
    ...mapActions([
      'sendScanOn',
      'sendObjOn',
      'setNewScannedDevices',
      'setRegScannedDevices',
      'sendGetRegObj',
    ]),
    goTo(name) {
      if (name == '현재 상태') {
        if (this.$route.path !== '/status') this.$router.push('/status')
        this.active_tab = 0
        this.setNowTab(0)
      } else if (name == '방범 모드') {
        if (this.$route.path !== '/security') this.$router.push('/security')
        this.active_tab = 1
        this.setNowTab(1)
      } else {
        if (this.$route.path !== '/my-device') this.$router.push('/my-device')
        this.active_tab = 2
        this.setNowTab(2)
      }
    },
  },
  mounted() {
    this.active_tab = this.getNowTab
    this.$socket.emit('sendGetRegObjToServer', 'data')
    this.$socket.on('sendRegistedObjToWeb', (data) => {
      this.setRegistedDevices(data)
    })
  },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
.tab--decor {
  text-decoration: none;
  color: #356859 !important;
}
</style>
