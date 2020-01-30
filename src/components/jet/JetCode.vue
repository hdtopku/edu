<template>
  <div>
    <el-button @click="open" type="primary" plain round>更新激活码</el-button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import {getJetCode} from '../../api/mail'
export default {
  data () {
    return {
      activeCode: ''
    }
  },
  mounted () {
    getJetCode().then(res => {
      this.activeCode = res.data
    })
  },
  methods: {
    open () {
      const that = this
      Swal.fire({
        title: '更新激活码',
        input: 'textarea',
        inputValue: this.activeCode,
        showCancelButton: true,
        confirmButtonText: '更新',
        cancelButtonText: '取消',
        showLoaderOnConfirm: true,
        preConfirm: function (newCode) {
          return getJetCode({'code': newCode})
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
