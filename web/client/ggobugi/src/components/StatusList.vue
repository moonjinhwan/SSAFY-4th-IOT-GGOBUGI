<template>
  <div>
    <!-- <div class="mx-4 mb-3 d-flex flex-row-reverse">

    <v-btn
      id="btn-color"
      outlined
      rounded
      text
      @click="refresh()"
    >
      새로고침
    </v-btn>

    </div> -->
    <v-card class="mx-auto mb-4" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>현재 시각</v-list-item-subtitle>
          <v-list-item-title class="headline mt-2 mb-1">
            {{ time }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <v-img src="@/assets/time.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
    <v-card class="mx-auto mb-4" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>날씨</v-list-item-subtitle>
          <v-list-item-title class="headline mt-2 mb-1">
            {{ weather }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <v-img src="@/assets/weather.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
    <v-card class="mx-auto mb-4" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>기온</v-list-item-subtitle>
          <v-list-item-title class="headline mt-2 mb-1">
            {{ temperature }}도
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <v-img src="@/assets/temp.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'StatusList',
  created() {
    this.putTime()
    setInterval(this.putTime, 1000)
    this.$socket.emit('sendStateRefreshToServer', 'data')
    this.$socket.on('sendWeatherToWeb', (data) => {
      this.weather = data
    })
    this.$socket.on('sendTemperatureToWeb', (data) => {
      this.temperature = data
    })
  },
  data() {
    return {
      time: '',
      weather: '',
      temperature: '',
      pe: '',
    }
  },
  computed: {
    ...mapGetters([
      'getServerSocket',
      'getRegScannedDevices',
      'getNewScannedDevices',
      'getScannedDevices',
      'getStatusList',
    ]),
  },
  methods: {
    ...mapMutations(['setScannedDevices', 'setStatusList', 'resetStatusList']),
    ...mapActions([
      'sendScanOn',
      'sendObjOn',
      'setNewScannedDevices',
      'setRegScannedDevices',
      'sendStateRefresh',
    ]),
    putTime() {
      const moment = require('moment')
      this.time = moment().format('MM-DD HH:mm:ss')
    },
  },
}
</script>

<style>
#btn-color {
  color: white;
  background-color: #356859;
}
</style>
