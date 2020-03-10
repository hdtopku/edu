<template>
    <el-link type="info" icon="el-icon-edit" class="edit-icon" @click="open"></el-link>
</template>

<script>
import Swal from 'sweetalert2'
import {syncGetJetCode} from '../../api/mail'
export default {
  data () {
    return {
      activeCode: ''
    }
  },
  methods: {
    update () {
      const res = syncGetJetCode()
      this.activeCode = res.data
    },
    open () {
      this.update()
      const that = this
      Swal.fire({
        title: '<a href="http://idea.medeming.com/jets/images/jihuoma.txt" target="_blank">更新</a>激活码',
        input: 'textarea',
        inputValue: this.activeCode,
        showCancelButton: true,
        confirmButtonText: '更新',
        cancelButtonText: '取消',
        showLoaderOnConfirm: true,
        showCloseButton: true,
        preConfirm: function (newCode) {
          return syncGetJetCode({'code': newCode})
        },
        allowOutsideClick: false
      }).then(function (res) {
        if (res.dismiss !== 'cancel') {
          that.activeCode = res.value.data
          Swal.fire({
            type: 'success',
            title: '激活码更新成功'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.edit-icon {
  font-size: 20px;
}
</style>
