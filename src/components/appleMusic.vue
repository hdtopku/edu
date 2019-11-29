<template>
<div>
  <ul class="cards">
    <li class="item" v-for="(item,idx) in mails"
     :key="idx">
      <card :mail="item" :idx="idx" :isEdit="isEdits[idx]"
       @changeEdit="changeEdit" @changeMail="changeMail" :isLoading="isLoading"></card>
    </li>
  </ul>
  <el-divider></el-divider>
  <el-link href="https://mail.pku.edu.cn/" style="float:right;z-index:5000;"
   type="primary" target="_blank">打开邮箱</el-link>
  <el-tabs v-model="activeName">
    <el-tab-pane label="快速" name="first">
      <el-timeline>
        <el-timeline-item placement="top" v-for="(i, index) in others" :key="index">
          <el-card style="text-align:left;cursor:pointer;" @click.native="doCopy(index, true)">
          <div v-for="(j, idx) in i" :key="idx">{{j}}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>
    <el-tab-pane label="步骤" name="second">
    <div class="block">
    <el-timeline>
      <el-timeline-item placement="top" v-for="(i, index) in activities" :key="index">
        <el-card style="text-align:left;cursor:pointer;" @click.native="doCopy(index)">
        <div v-for="(j, idx) in i" :key="idx">{{j}}</div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Card from './card.vue'
import Swal from 'sweetalert2'
import { getMails, getQr } from '../api/mail'

export default {
  name: 'edu',
  components: {
    Swal,
    Card
  },
  data () {
    return {
      activeName: 'first',
      activities: [
        ['https://www.myunidays.com/CN/zh-CN'],
        ['步骤一', '1、打开链接：https://www.myunidays.com/CN/zh-CN', '2、点击 黑人头像', '3、点击 Get now', '4、点击 Join Now', '完成后，截图给我'],
        ['步骤二', '1、前两项填这个邮箱', '2、第三、四项是密码，由您设定', '3、Male(男)、Female(女)，任选一个', '4、点击 Join Now', '完成后，截图给我'],
        ['步骤三', '1、前两项姓名（可以自己定）', '2、第三项填写pku，并选择列表第一项PKU', '3、第四项 左边 Year 1，右边 4 Years', '4、点击 Continue', '完成后，截图给我'],
        ['步骤四', '1、前两项邮箱，填我给您的邮箱', '2、点击 Send Email', '3、耐心等我接收邮件', '完成后，截图给我'],
        ['步骤五', '1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）', '2、点击 Continue（随后自动跳转至Apple Music）', '具体步骤，可参考教程步骤五：http://music.taojingling.cn/am', ':)遇到问题，随时截图给我哈。']
      ],
      activitiesText: [
        `https://www.myunidays.com/CN/zh-CN`,
        `步骤一：1、打开链接：https://www.myunidays.com/CN/zh-CN
2、点击 黑人头像
3、点击 Get now
4、点击 Join Now

完成后，截图给我`,
        `步骤二：1、前两项填这个邮箱
2、第三、四项是密码，由您设定
3、Male(男)、Female(女)，任选一个
4、点击 Join Now

完成后，截图给我`,
        `步骤三：1、前两项姓名（可以自己定）
2、第三项填写pku，并选择列表第一项PKU
3、第四项 左边 Year 1，右边 4 Years
4、点击 Continue

完成后，截图给我`,
        `步骤四：1、前两项邮箱，填我给您的邮箱
2、点击Send Email
3、耐心等我接收邮件

完成后，截图给我`,
        `步骤五：1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）
2、点击 Continue（随后自动跳转至Apple Music）

具体步骤，可参考教程步骤五：http://music.taojingling.cn/am
:)遇到问题，随时截图给我哈。`
      ],
      others: [
        ['所有邮箱都填这个，', '教程：http://music.taojingling.cn/am', ':) 遇到问题，随时截图给我'],
        [':) 之后遇到任何问题，随时联系哈。满意的话给小店一个好评哦~'],
        ['丢件？', '1、点击 Verify on campus', '2、在新的页面，点击 Verify using email', '3、前两项输入刚刚的邮箱', '4、Send Email，并等我收取邮件', '完成后，截图给我'],
        ['用多久？', '1到4年，苹果官方会抽取部分用户再次验证。如果被抽中了，需要换个邮箱重新验证；如果没被抽中，就可以接着用哈。'],
        ['查看订阅？', '1、打开 设置->', '2、点击 Apple ID、iCloud、iTunes与Apple Store->', '3、点击 订阅'],
        ['Logout', '1、点击页面左上角的等于号', '2、点击Log out']
      ],
      othersText: [
        `所有邮箱都填这个，
教程：http://music.taojingling.cn/am

:) 遇到问题，随时截图给我`,
        `:) 之后遇到任何问题，随时联系哈，满意的话给小店一个好评哦~`,
        `1、点击 Verify on campus
2、在新的页面，点击 Verify using email
3、前两项输入刚刚的邮箱
4、Send Email，并等我收取邮件

完成后，截图给我`,
        `1到4年，苹果官方会抽取部分用户再次验证。如果被抽中了，需要换个邮箱重新验证；如果没被抽中，就可以接着用哈。`,
        `1、打开 设置->
2、点击 Apple ID、iCloud、iTunes与Apple Store->
3、点击 订阅`,
        `1、点击页面左上角的等于号
2、点击Log out`
      ],
      qr: {},
      mails: ['fsadfafsassq1234', 'b', ''],
      isEdits: [false, false, false],
      isLoading: false
    }
  },
  mounted () {
    getMails().then((res) => {
      this.setMails(res.data)
    })
  },
  methods: {
    onClick: function (oldMail, index) {
      const title = `<div style="color:red">${oldMail}</div>`
      Swal.fire({
        title,
        text: '确认替换？',
        showCancelButton: true,
        confirmButtonColor: 'pink',
        cancelButtonColor: '#00CCFF',
        confirmButtonText: '取消',
        cancelButtonText: '确定'
      }).then((result) => {
        if (!result.value) {
          getMails({'old': oldMail, 'new': 'RANDOM'}).then((res) => {
            this.mails = res.data
          })
        }
      })
    },
    changeEdit (idx, isEdit) {
      this.isEdits = [false, false, false]
      this.isEdits[idx] = isEdit
    },
    addEmail: function () {
      getMails({'new': 'RANDOM'}).then((res) => {
        this.mails = res.data
      })
    },
    doCopy: function (i, isOther = false) {
      var copyText = this.activitiesText[i]
      var toastText = this.activities[i][0] + ' copied!'
      if (isOther) {
        copyText = this.othersText[i]
        toastText = '<div style="color:red;">' + this.others[i][0] + '</div>copyied!'
      }
      this.$copyText(copyText).then((e) => {
      // success
        this.openCenter(toastText)
      }, (e) => {
      // fail
      })
    },
    changeMail: function (oldMail, newMail) {
      this.isLoading = true
      const that = this
      getMails({'old': oldMail, 'new': newMail}).then((res) => {
        this.setMails(res.data)
        that.isLoading = false
      })
    },
    setMails: function (mails) {
      this.mails = mails
      while (this.mails.length < 3) {
        this.mails.push('')
      }
    },
    openCenter: function (Text = 'copied!') {
      this.$toast.top(Text)
    },
    getQR: function () {
      getQr().then((res) => {
        this.qr = res.data
        this.openCenter('updated!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cards {
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.item {
  padding: 5px;
  width: 100px;
  height: 150px;
  margin-top: 10px;
  color: white;
  text-align: center;
}
</style>
