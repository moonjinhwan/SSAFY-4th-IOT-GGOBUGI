<template>
  <div>
    <SecurityController class="mt-7" />
    <Images class="mt-7 mx-4" style="width: 342px;" />
  </div>
</template>

<script>
import SecurityController from '@/components/SecurityController'
import Images from '@/components/Images'

export default {
  name: 'Security',
  components: {
    SecurityController,
    Images,
  },
}
</script>

<style></style>
