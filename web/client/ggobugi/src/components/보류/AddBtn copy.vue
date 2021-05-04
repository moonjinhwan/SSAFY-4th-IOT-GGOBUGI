<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="btn-color"
          outlined
          rounded
          text
          v-bind="attrs"
          v-on="on"
        >
          디바이스 선택하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Devices</v-card-title>
        <v-divider></v-divider>
        <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="devices"
              :disabled="isUpdating"
              :items="deviceList"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  class="mt-1"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img src="@/assets/ccc.png"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img src="@/assets/ccc.png">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            style="color: #356859"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

  export default {
    name: "AddBtn",
    data () {
      return {
        dialog: false,
        autoUpdate: true,
        devices: [],
        isUpdating: false,
        name: 'Midnight Crew',
        deviceList: [
          { header: '조명' },
          { name: '신발장 조명', group: '조명' },
          { name: '주방 조명', group: '조명' },
          { name: '거실 조명', group: '조명' },
          { name: '방1 조명', group: '조명' },
          { name: '방2 조명', group: '조명'},
          { name: '방3 조명', group: '조명' },
          { name: '방4 조명', group: '조명'},
          { divider: true },
          { header: '기기' },
          { name: '방1 에어컨', group: '기기'},
          { name: '방2 에어컨 ', group: '기기' },
          { name: '방3 에어컨', group: '기기' },
          { name: '거실 에어컨', group: '기기'},
          { name: '공기 청정기', group: '기기'},
          { name: 'TV', group: '기기'},
          { divider: true },
          { header: '커튼' },
          { name: '방1 커튼', group: '커튼'},
          { name: '방2 커튼 ', group: '커튼' },
          { name: '방3 커튼', group: '커튼' },
          { name: '거실 커튼', group: '커튼'},
        ],
      }
    },
    mounted() {
      this.devices = this.getMyDevices
      // console.log('버튼mounted',this.devices)
    },
    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
      devices(newVal) {
        this.setMyDevices(newVal)
        console.log('버튼워치',this.devices)
      }
    },
    computed: {
      ...mapGetters([
        "getMyDevices"
      ])
    },
    methods: {
      ...mapMutations([
        "setMyDevices"
      ]),
      remove (item) {
        const index = this.devices.indexOf(item.name)
        if (index >= 0) this.devices.splice(index, 1)
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

