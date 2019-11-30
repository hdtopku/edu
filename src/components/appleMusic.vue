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
  <div style="display:flex; float:right;">
    <el-link href="http://music.taojingling.cn/am" style="margin-right:20px; z-index:1;"
    type="primary" target="_blank">教程</el-link>
    <el-link href="https://mail.pku.edu.cn/" type="primary" style="z-index:1;" target="_blank">打开邮箱</el-link>
  </div>
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
        ['步骤二', '1、填教育邮箱（一、二项）', '2、设密码（三、四项）', '3、性别：Male 男、Female 女', '4、点击 Join Now', '完成后，截图给我'],
        ['步骤三', '1、名：First Name，姓：Last Name', '2、第三项填pku，并选择列表第一项PKU', '3、左边 Year 1，右边 4 Years', '4、点击 Continue', '完成后，截图给我'],
        ['步骤四', '1、填教育邮箱（一、二项）', '2、点击 Send Email，截图通知我收邮件'],
        ['步骤五', '1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）', '2、点击 Continue（随后自动跳转至Apple Music）', '可参考步骤五：http://music.taojingling.cn/am', ':)遇到问题，随时截图给我哈。']
      ],
      activitiesText: [
        'https://www.myunidays.com/CN/zh-CN',
        `步骤一：1、打开链接：https://www.myunidays.com/CN/zh-CN
2、点击 黑人头像
3、点击 Get now
4、点击 Join Now

完成后，截图给我`,
        `步骤二：1、填教育邮箱（一、二项）
2、设密码（三、四项）
3、性别：Male 男、Female 女
4、点击 Join Now

完成后，截图给我`,
        `步骤三：1、前两项姓名（可以自己定）
2、第三项填pku，并选择列表第一项PKU
3、左边 Year 1，右边 4 Years
4、点击 Continue
`,
        `步骤四：1、填教育邮箱（一、二项）
2、点击 Send Email
3、耐心等我接收邮件

完成后，截图给我`,
        `步骤五：1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）
2、点击 Continue（随后自动跳转至Apple Music）

可参考步骤五：http://music.taojingling.cn/am
:)遇到问题，随时截图给我哈。`
      ],
      others: [
        ['0、开始', '所有邮箱都填这个，', '教程：http://music.taojingling.cn/am', ':) 遇到问题，随时截图给我'],
        ['1、用多久？', '1到4年，苹果官方会抽取部分用户再次验证。如果被抽中了，需要换个邮箱重新验证；如果没被抽中，就可以接着用哈。'],
        ['3、丢件？', '补充步骤：', '1、点击 Verify on campus', '2、点击 Verify using email', '3、前两项输入刚刚的邮箱', '4、Send Email，并等我收取邮件', '完成后，截图给我'],
        ['4、换新邮件？', '1、第一项填刚刚的邮箱', '2、第二项填pku，并选择列表第一项PKU', '3、点击 Continue 继续', '完成后，截图给我'],
        // ['丢件？（没有Verify on campus按钮）', '打开链接（较慢）：https://www.myunidays.com/CN/zh-CN/account/register-wayf', '1、点击 Verify on campus', '2、点击 Verify using email', '3、前两项输入刚刚的邮箱', '4、Send Email，并等我收取邮件', '完成后，截图给我'],
        ['5、长链接无效？', '情况一（体验或订阅过 Apple Music）：', '1、打开 设置', '2、点击 Apple ID、iCloud、iTunes 与 Apple Store', '3、点击 订阅', '4、点击 Apple Music 会员资格', '5、选择 学生（1个月）',
          '情况二（从未用过 Apple Music）：', '1、打开 Apple Music', '2、点击 为你推荐', '3、点击 立即体验', '4、选择 大学生', '5、点击 开始试用', '6、点击 验证资格',
          '跳转到Safari后，截图给我。'
        ],
        ['6、查看订阅？', '1、打开 设置', '2、点击 Apple ID、iCloud、iTunes 与 Apple Store', '3、点击 订阅'],
        ['7、Logout？', '1、点击页面左上角的等于号', '2、点击 Log out'],
        ['8、换区？', '换区教程：https://zh.wikihow.com/在iTunes或App-Store中切换国家'],
        [':) 之后遇到任何问题，随时联系哈。满意的话给小店一个好评哦~']
      ],
      othersText: [
        `所有邮箱都填这个，
教程：http://music.taojingling.cn/am

:) 遇到问题，随时截图给我`,
        `1到4年，苹果官方会抽取部分用户再次验证。如果被抽中了，需要换个邮箱重新验证；如果没被抽中，就可以接着用哈。`,
        `补充步骤：
1、点击 Verify on campus
2、点击 Verify using email
3、前两项填刚刚的邮箱
4、Send Email，并等我收取邮件

完成后，截图给我`,
        `1、第一项，填刚刚的邮箱
2、第二项，填pku，并选择列表第一项PKU
3、点击 Continue 继续

完成后，截图给我`,
        //         `打开链接（较慢）：https://www.myunidays.com/CN/zh-CN/account/register-wayf
        // 1、点击 Verify on campus
        // 2、点击 Verify using email
        // 3、前两项输入刚刚的邮箱
        // 4、Send Email，并等我收取邮件

        // 完成后，截图给我`,
        `情况一（体验或订阅过 Apple Music）：
1、打开 设置
2、点击 Apple ID、iCloud、iTunes 与 Apple Store
3、点击 订阅
4、点击 Apple Music 会员资格
5、选择 学生（1个月）
6、点击 验证资格

情况二（从未用过 Apple Music）：
1、打开 Apple Music
2、点击 为你推荐
3、点击 立即体验
4、选择 大学生
5、点击 开始试用
6、点击 验证资格

跳转到Safari后，截图给我。`,
        `1、打开 设置
2、点击 Apple ID、iCloud、iTunes 与 Apple Store
3、点击 订阅`,
        `1、点击页面左上角的等于号
2、点击 Log out`,
        `换区教程：https://zh.wikihow.com/在iTunes或App-Store中切换国家`,
        `:) 之后遇到任何问题，随时联系哈。满意的话给小店一个好评哦~`
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
      var copyText = ''
      var toastText = ''
      if (isOther) {
        copyText = this.othersText[i]
        toastText = '<div style="color:red;">' + this.others[i][0] + '</div>copyied!'
      } else {
        copyText = this.activitiesText[i]
        toastText = this.activities[i][0] + ' copied!'
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
