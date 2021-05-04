<template>
  <v-carousel :show-arrows="false" style="width: 320px; height: 240px;">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      <img
        :src="item.src"
        style="width: 320px; height: auto;"
        :alt="item.src"
      />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Images',
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$socket.on('sendThiefToWeb', (data) => {
      this.items = []
      for (var i = 0; i < data.length; i++) {
        this.items.push({
          src: 'data:image/jpeg;base64,' + data[i].slice(2, data[i].length - 1),
        })
      }
    })
  },
}
</script>
