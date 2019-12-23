<template id="t">
  <div>
    <!-- <button v-clipboard="copyData">Copy</button> -->
    <nums></nums>
    <!-- <cube></cube> -->
  </div>
</template>

<script>
import Nums from './nums/Nums'
import Cube from './nums/Cube'
export default {
  components: {
    nums: Nums,
    cube: Cube
  },
  data () {
    return {
      copyData: 'copy data'
    }
  },
  methods: {
    // handleSuccess (e) {
    //   console.log(e)
    // },
    // handleError (e) {
    //   console.log(e)
    // }
  }
}
</script>
<style scoped>
</style>
