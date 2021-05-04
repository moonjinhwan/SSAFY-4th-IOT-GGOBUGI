<template>
  <div>
    <v-card
      v-for="(device, idx) in getMyDevices"
      :key="idx"
      class="mx-auto mb-4"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>{{ device }}</v-list-item-subtitle>
          <v-list-item-title class="headline mt-2 mb-1" v-if="!device.switch1">
             : OFF
          </v-list-item-title>
          <v-list-item-title class="headline mt-2 mb-1" v-else>
             : ON
          </v-list-item-title>
          
        </v-list-item-content>
        <v-list-item-avatar
        tile
        size="80"
      >
      <v-switch
      v-model="device.switch1"
      inset
      color="success"
    ></v-switch>
        </v-list-item-avatar>
    </v-list-item>

    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from "vuex";

export default {
  name: "MyDeviceList",
  computed: {
      ...mapGetters([
        "getMyDevices"
      ])
    },
  methods: {
    ...mapMutations([
        "setMyDevices"
      ]),
  }
}
</script>

<style>
#btn-color {
  color: white;
  background-color: #356859;
}
</style>