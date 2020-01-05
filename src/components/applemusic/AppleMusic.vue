<template>
<div>
  <el-tabs v-model="activeName">
    <div style="display:flex; float:left;">
      <el-link
        href="http://music.taojingling.cn/1.html"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >教程</el-link>
    </div>

    <el-tab-pane label="常用" name="first">
      <el-timeline>
        <el-timeline-item placement="top" v-for="(i, index) in fast" :key="index">
          <el-card style="text-align:left;cursor:pointer;" @click.native="doCopy(index, 'fast')">
          <div v-for="(j, idx) in i" :key="idx">{{j}}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>

    <el-tab-pane label="备用" name="second">
    <div class="block">
    <el-timeline>
      <el-timeline-item placement="top" v-for="(i, index) in standby" :key="index">
        <el-card style="text-align:left;cursor:pointer;" @click.native="doCopy(index, 'standby')">
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
import Swal from 'sweetalert2'
import LongLink from './LongLink'
import { getQr } from '../../api/mail'

export default {
  name: 'edu',
  components: {
    Swal,
    'long-link': LongLink
  },
  data () {
    return {
      activeName: 'first',

      fast: [
        ['开始', '复制长链接到浏览器进行验证，具体参考：http://music.taojingling.cn/ap'],
        ['用多久？', '1到4年，官方会抽取部分用户再次验证。', '如果被抽中，需重新下单验证；', '否则，可继续使用。'],
        ['查看订阅？', '1、打开 设置', '2、点击 Apple ID、iCloud、iTunes 与 Apple Store', '3、点击 订阅'],
        ['长链接无效？', '情况一（体验或订阅过 Apple Music）：', '1、打开 设置', '2、点击 Apple ID、iCloud、iTunes 与 Apple Store', '3、点击 订阅', '4、点击 Apple Music 会员资格', '5、选择 学生（1个月）',
          '情况二（从未用过 Apple Music）：', '1、打开 Apple Music', '2、点击 为你推荐', '3、点击 立即体验', '4、选择 大学生', '5、点击 开始试用', '6、点击 验证资格',
          '跳转到Safari后，截图给我。'
        ]
      ],
      fastText: [
        `复制长链接到浏览器进行验证，具体参考：http://music.taojingling.cn/ap`,
        `1到4年，官方会抽取部分用户再次验证。如果被抽中，需重新下单验证；否则，可继续使用。`,
        `查看订阅：
1、打开 设置
2、点击 Apple ID、iCloud、iTunes 与 Apple Store
3、点击 订阅`,
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

跳转到Safari后，截图给我。`
      ],

      standby: [
        ['https://www.myunidays.com/CN/zh-CN'],
        ['好评？', ':) 之后遇到任何问题，随时联系哈。满意的话给小店一个好评哦~'],
        ['步骤一', '0、打开验证链接：http://music.taojingling.cn/ap', '1、点击 黑人头像', '2、点击 Get now', '3、点击 Join Now', '完成后，截图给我'],
        ['步骤二', '1、填教育邮箱（一、二项）', '2、您设定密码（三、四项）', '3、性别：Male 男、Female 女', '4、点击 Join Now', '完成后，截图给我'],
        ['步骤三', '1、填姓名（一、二项）', '2、第三项，填pku，并选择列表第一项PKU', '3、左边 Year 1，右边 4 Years', '4、点击 Continue', '完成后，截图给我'],
        ['步骤四', '1、填教育邮箱（一、二项）', '2、点击 Send Email', '完成后，截图给我，并等我收邮件。'],
        ['步骤五', '1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）', '2、点击 Continue（随后自动跳转至Apple Music）',
          '参考步骤五：http://music.taojingling.cn/ap', ':)遇到问题，随时截图给我哈。'],
        ['补充验证？', '补充验证（苹果丢件）：', '1、第一项，填刚刚的邮箱', '2、第二项，填pku，并选择列表第一项PKU', '3、点击 Continue 继续', '完成后，截图给我'],
        ['补发邮件？', '补充步骤（苹果邮件延迟或丢失）：', '1、点击 Verify on campus', '2、点击 Verify using email', '3、前两项输入刚刚的邮箱', '4、Send Email，并等我收取邮件', '完成后，截图给我'],
        ['未出现pku？', '若未出现PKU列表，需换浏览器打开：https://www.myunidays.com/CN/zh-CN'],
        ['Logout？', '1、点击页面左上角的等于号', '2、点击 Log out'],
        ['换区？', '换区教程：https://zh.wikihow.com/在iTunes或App-Store中切换国家']
        // ['丢件？（没有Verify on campus按钮）', '打开链接（较慢）：https://www.myunidays.com/CN/zh-CN/account/register-wayf', '1、点击 Verify on campus', '2、点击 Verify using email', '3、前两项输入刚刚的邮箱', '4、Send Email，并等我收取邮件', '完成后，截图给我'],
      ],
      standbyText: [
        'https://www.myunidays.com/CN/zh-CN',
        `:) 之后遇到任何问题，随时联系哈。满意的话给小店一个好评哦~`,
        `步骤一：0、打开验证链接：https://www.myunidays.com/CN/zh-CN
1、点击 黑人头像
2、点击 Get now
3、点击 Join Now

完成后，截图给我`,
        `步骤二：1、填教育邮箱（一、二项）
2、您设定密码（三、四项）
3、性别：Male 男、Female 女
4、点击 Join Now

完成后，截图给我`,
        `步骤三：1、填姓名（一、二项）
2、第三项，填pku，并选择列表第一项PKU
3、左边 Year 1，右边 4 Years
4、点击 Continue

完成后，截图给我`,
        `步骤四：1、填教育邮箱（一、二项）
2、点击 Send Email

完成后，截图给我，并等我接收邮件。`,
        `步骤五：1、复制长链接到浏览器打开（页面加载很慢，请耐心等待）
2、点击 Continue（随后自动跳转至Apple Music）

参考步骤五：http://music.taojingling.cn/ap
:)遇到问题，随时截图给我哈。`,
        `补充验证（苹果丢件）：
1、第一项，填刚刚的邮箱
2、第二项，填pku，并选择列表第一项PKU
3、点击 Continue 继续

完成后，截图给我`,
        `补充步骤（苹果邮件延迟或丢失）：
1、点击 Verify on campus
2、点击 Verify using email
3、前两项填刚刚的邮箱
4、Send Email，并等我收邮件

完成后，截图给我`,
        `若未出现PKU列表，
需换浏览器打开：https://www.myunidays.com/CN/zh-CN`,
        `1、点击页面左上角的等于号
2、点击 Log out`,
        `换区教程：https://zh.wikihow.com/在iTunes或App-Store中切换国家`
        //         `打开链接（较慢）：https://www.myunidays.com/CN/zh-CN/account/register-wayf
        // 1、点击 Verify on campus
        // 2、点击 Verify using email
        // 3、前两项输入刚刚的邮箱
        // 4、Send Email，并等我收取邮件

        // 完成后，截图给我`,
      ],

      steps: [
      ],
      stepsText: [
      ],
      qr: {}
    }
  },
  methods: {
    doCopy: function (i, type = 'fast') {
      var copyText = ''
      var toastText = ''
      if (type === 'fast') {
        copyText = this.fastText[i]
        toastText = '<div style="color:red;">' + this.fast[i][0] + '</div>copyied!'
      } else if (type === 'standby') {
        copyText = this.standbyText[i]
        toastText = '<div style="color:red;">' + this.standby[i][0] + '</div>copyied!'
      } else if (type === 'steps') {
        copyText = this.stepsText[i]
        toastText = '<div style="color:red;">' + this.steps[i][0] + '</div>copyied!'
      }
      this.$copyText(copyText).then((e) => {
      // success
        this.openCenter(toastText)
      }, (e) => {
      // fail
      })
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
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(https://i.loli.net/2019/12/01/AO3x9CUQ1ZnaurF.jpg);
    filter: blur(1px);
}
</style>
