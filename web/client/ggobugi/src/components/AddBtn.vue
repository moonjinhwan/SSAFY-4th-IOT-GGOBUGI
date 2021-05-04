<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="btn-color" dark v-bind="attrs" v-on="on">
          주변기기 스캔하기
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark id="btn-color">
          <v-btn icon dark @click="closeBtn()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Scan Devices</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              :disabled="
                !selectedDevice || deviceName.length < 3 || !direction.length
              "
              @click="addDevice()"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-subheader>Devices</v-subheader>
        <v-select
          class="mx-6"
          :items="getScannedDevices"
          item-text="name"
          item-value="uid"
          :rules="rules.rule2"
          label="디바이스 선택"
          outlined
          v-model="selectedUid"
        ></v-select>

        <v-divider></v-divider>
        <div style="height: 50px;">
          <v-text-field
            class="mx-6 my-4"
            label="디바이스 이름"
            :rules="rules.rule1"
            hide-details="auto"
            v-model="deviceName"
          ></v-text-field>
        </div>
        <v-row justify="center">
          <div>
            <v-subheader class="mt-8">
              아래 이미지에 디바이스를 배치할 위치를 클릭해주세요!
            </v-subheader>
          </div>
        </v-row>
        <v-row justify="center">
          <div>
            <img
              ref="regmap"
              @click="saveDirection()"
              src="@/assets/mymap.png"
              class="mx-3 my-6"
              alt="지도"
              style="width: 350px; height: 350px; position: relative;"
            />
          </div>
          <div>
            <img
              v-show="direction.length != 0"
              id="childIcon"
              src="@/assets/gkxm.png"
              alt="하트"
              :style="{
                top: direction[1] + 335 + 'px',
                left: direction[0] + box.x - 14 + 'px',
              }"
            />
          </div>
          <div>
            <img
              id="childIcon"
              src="@/assets/ggo.png"
              alt="꼬부기"
              :style="{
                top: ggobugi[1] + 335 + 'px',
                left: ggobugi[0] + box.x - 12 + 'px',
              }"
            />
          </div>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AddBtn',
  props: {
    iotLoc: Array,
  },
  data() {
    return {
      box: { x: 0, y: 0 },
      selectedUid: '',
      selectedDevice: {},
      deviceName: '',
      direction: [],
      ggobugi: [],
      dialog: false,
      sound: true,
      widgets: false,
      net_status: '',
      dev_status: '',
      rules: {
        rule1: [
          (value) => !!value || '필수 항목입니다.',
          (value) => (value && value.length >= 3) || '3자 이상 입력해주세요.',
        ],
        rule2: [(value) => !!value || '필수 항목입니다.'],
      },
    }
  },
  watch: {
    iotLoc(val) {
      this.ggobugi = [(-val[0] + 2.75) / 0.05, (val[1] - 2.25) / 0.05]
      if (this.$refs.regmap) {
        this.box = this.$refs.regmap.getBoundingClientRect()
      }
    },
    dialog(val) {
      if (val) {
        this.sendScanOn(this.$socket)
        this.$socket.on('sendNewScannedObjToWeb', (data) => {
          this.setScannedDevices(data)
        })
      } else {
        this.$socket.emit('sendScanOffToServer', 'data')
      }
    },
    selectedUid(val) {
      for (var i = 0; i < this.getScannedDevices.length; i++) {
        if (this.getScannedDevices[i].uid == val) {
          this.selectedDevice = this.getScannedDevices[i]
        }
      }
      this.$socket.emit('sendScanOffToServer', 'data')
    },
  },
  computed: {
    ...mapGetters(['getMyDevices', 'getServerSocket', 'getScannedDevices']),
  },
  mounted() {
    this.ggobugi = [
      (-this.iotLoc[0] + 2.75) / 0.05,
      (this.iotLoc[1] - 2.25) / 0.05,
    ]
  },
  // updated(){

  // },
  methods: {
    ...mapMutations(['setRegistedDevices', 'setScannedDevices']),
    ...mapActions(['sendRegistObj', 'sendGetRegObj', 'sendScanOn']),
    addDevice() {
      // [uid, name, net_status, dev_status, [imgX, imgY]]
      const data = [
        this.selectedDevice.uid,
        this.deviceName,
        this.selectedDevice.net_status,
        this.selectedDevice.dev_status,
        this.direction,
      ]
      this.$socket.emit('sendRegistObjToServer', data)
      this.$socket.emit('sendGetRegObjToServer', 'data')
      this.selectedDevice = ''
      this.deviceName = ''
      this.direction = []
      this.dialog = false
      this.setScannedDevices({})
    },
    saveDirection() {
      this.direction = [event.offsetX, event.offsetY]
    },
    closeBtn() {
      this.selectedDevice = ''
      this.deviceName = ''
      this.direction = []
      this.dialog = false
      this.setScannedDevices({})
    },
  },
  destroyed() {
    this.$socket.emit('sendScanOffToServer', 'data')
    this.setScannedDevices({})
  },
}
</script>
<style>
#btn-color {
  color: white;
  background-color: #356859;
}
#childIcon {
  z-index: 2;
  width: 30px;
  position: absolute;
}
</style>
