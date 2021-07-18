<!--<template>-->
<!--<div>-->
<!--<a-list item-layout="horizontal" :data-source="longShortLinks">-->
<!--  <a-list-item slot="renderItem" slot-scope="item,index">-->
<!--    <a slot="actions">edit</a>-->
<!--    <a slot="actions">more</a>-->
<!--    <a-list-item-meta-->
<!--      description="Ant Design, a design language for background applications, is refined by Ant UED Team"-->
<!--    >-->
<!--      <a slot="title" href="https://www.antdv.com/">{{ item.long_link.substring(46, 50) }}</a>-->
<!--      <a-avatar-->
<!--        slot="avatar"-->
<!--        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
<!--      />-->
<!--    </a-list-item-meta>-->
<!--    <div>content</div>-->
<!--  </a-list-item>-->
<!--</a-list>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import {getLongShortLinks} from '../../api/mail'-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      longShortLinks: []-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    getLongShortLinks().then(res => {-->
<!--      this.longShortLinks = res.data-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
