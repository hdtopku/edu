<template id="t">
  <button v-clipboard="copyData">Copy</button>
</template>

<script>
export default{
  data () {
    return {
      copyData: 'copy data'
    }
  },
  methods: {
    handleSuccess (e) {
      console.log(e)
    },
    handleError (e) {
      console.log(e)
    }
  }
}
</script>
