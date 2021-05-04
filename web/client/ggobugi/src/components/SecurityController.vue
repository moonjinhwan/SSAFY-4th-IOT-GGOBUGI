<template>
  <div>
    <v-card class="mx-auto mb-4" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline">방범모드</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <v-switch
            inset
            color="success"
            @change="secOnOff()"
            v-model="secStatus"
          ></v-switch>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
    <v-row justify="center">
      <div>
        <v-btn id="btn-color" class="mx-auto mt-4" dark @click="imgShow()">
          도둑 사진 불러오기
        </v-btn>
      </div>
    </v-row>
    <v-row justify="center">
      <div class="mt-4">
        <img v-if="imageSrc" :src="imageSrc" width="342px" />
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SecurityController',
  data() {
    return {
      imageSrc: null,
      secStatus: false,
    }
  },

  methods: {
    imgShow: function () {
      this.$socket.emit('sendGetThiefToServer', 'data')
    },
    getSecurityStatus: function () {
      this.$socket.emit('sendGetSecurityStatusToServer', 'data')
    },
    secOnOff() {
      if (this.secStatus) {
        this.$socket.emit('sendSecurityModeOnToServer', 'data')
      } else {
        this.$socket.emit('sendSecurityModeOffToServer', 'data')
      }
      setTimeout(() => this.getSecurityStatus(), 3000)
    },
  },
  mounted() {
    this.$socket.on('sendSecurityStatusToWeb', (data) => {
      this.secStatus = data
    })
    this.getSecurityStatus()
  },
}
</script>

<style></style>
