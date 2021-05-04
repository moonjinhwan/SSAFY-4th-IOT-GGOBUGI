<template>
  <div>
    <v-row justify="center">
      <div ref="defmap">
        <img
          id="parentMap"
          src="@/assets/mymap.png"
          class="mx-3 my-6"
          alt="지도"
          style="width: 350px; height: 350px;"
        />
      </div>

      <div v-for="(device, idx) in getRegistedDevices" :key="idx">
        <img
          id="childIcon"
          src="@/assets/gkxm.png"
          alt="하트"
          @click="selectDevice(device)"
          :style="{
            top: device[5][1] + 220 + 'px',
            left: device[5][0] + box.x - 2 + 'px',
          }"
        />
      </div>

      <div>
        <img
          id="childIcon"
          src="@/assets/ggo.png"
          alt="꼬부기"
          :style="{
            top: ggobugi[1] + 212 + 'px',
            left: ggobugi[0] + box.x + 'px',
          }"
        />
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyDeviceList',
  computed: {
    ...mapGetters(['getRegistedDevices']),
  },
  props: {
    iotLoc: Array,
  },
  watch: {
    iotLoc(val) {
      this.ggobugi = [(-val[0] + 2.75) / 0.05, (val[1] - 2.25) / 0.05]
      if (this.$refs.defmap) {
        this.box = this.$refs.defmap.getBoundingClientRect()
      }
    },
  },
  data() {
    return {
      ggobugi: [],
      box: { x: 0, y: 0 },
    }
  },
  methods: {
    selectDevice(device) {
      this.$emit('setSelDeviceName', device[1])
    },
  },
}
</script>

<style>
#btn-color {
  color: white;
  background-color: #356859;
}
#parentMap {
  position: relative;
}
#childIcon {
  z-index: 2;
  width: 30px;
  position: absolute;
}
</style>
