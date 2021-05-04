<template>
  <div>
    <AddBtn v-bind:iot-loc="iot" class="my-4" />
    <MyDeviceList
      v-on:setSelDeviceName="setSelDevice"
      v-bind:iot-loc="iot"
      class="mt-4"
    />
    <Controller
      v-on:resetSelDevice="setSelDevice"
      v-bind:cur-device="selDevice"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import MyDeviceList from '@/components/MyDeviceList'
import AddBtn from '@/components/AddBtn'
import Controller from '@/components/Controller'
export default {
  name: 'MyDevice',
  computed: {
    ...mapGetters(['getRegistedDevices']),
  },
  components: {
    MyDeviceList,
    AddBtn,
    Controller,
  },
  data() {
    return {
      iot: [0, 0],
      selDeviceName: '',
      selDevice: [],
    }
  },
  watch: {
    getRegistedDevices() {
      this.setSelDevice(this.selDeviceName)
    },
  },
  mounted() {
    this.$socket.on('sendRocationToWeb', (data) => {
      this.iot = data
    })
    this.$socket.on('sendRegistedObjToWeb', (data) => {
      this.setRegistedDevices(data)
    })
    const socket = this.$socket
    setInterval(function () {
      socket.emit('sendGetRocationToServer', 'data')
    }, 500)
  },
  methods: {
    ...mapMutations(['setRegistedDevices']),
    setSelDevice(devName) {
      this.selDeviceName = devName
      var keyarr = Object.keys(this.getRegistedDevices)
      for (var i = 0; i < keyarr.length; i++) {
        if (keyarr[i] == devName) {
          this.selDevice = this.getRegistedDevices[keyarr[i]]
        }
      }
    },
  },
}
</script>

<style></style>
