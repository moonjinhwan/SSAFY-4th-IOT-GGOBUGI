<template>
  <div>
    <v-card v-show="curDevice" class="mx-auto mb-4" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title v-if="curDevice" class="headline">
            {{ curDevice[1] }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <v-switch
            inset
            color="success"
            v-model="deviceStatus"
            @change="clickOnOff()"
          ></v-switch>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Controller',
  props: {
    curDevice: Array,
  },
  data() {
    return {
      deviceStatus: false,
    }
  },
  watch: {
    curDevice(val) {
      if (val.length > 0) {
        if (val[3] == 'ON') this.deviceStatus = true
        else this.deviceStatus = false
      }
    },
  },
  methods: {
    clickOnOff() {
      if (this.deviceStatus) {
        this.$socket.emit('sendObjOnToServer', this.curDevice[1])
      } else {
        this.$socket.emit('sendObjOffToServer', this.curDevice[1])
      }
    },
  },
  destroyed() {
    this.$socket.emit('resetSelDevice', '')
  },
}
</script>

<style></style>
