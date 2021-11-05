
<template>
    <div class="home-menu">
      <Search @search="handleSearch" placeholder='请输入课程ID' />
       <TitleMenu :isActive="isSelect" @active="handleActive">
           <template v-slot:title>
              <!-- 给具名插槽传数据 -->
              <span>{{ bigTitle }}</span>
           </template>
           <template v-slot:icon>
               <Icon type="arrowRight" />
           </template>
       </TitleMenu>
       <VedioList :activeId="activeId" exClass="duoxueVedio" :menus="menus" :columns="1" @active="handleMenu" />
    </div>
</template>
<script>
import Search from '../components/topSearch/search'
import TitleMenu from '../components/menu/TitleMenu'
import VedioList from '../components/VedioList'
import Icon from '../components/Icon'
import request from '../utils/requestDuoxue'
import { Dialog } from 'vant'
import { Base64 } from 'js-base64'
export default {
  name: 'DuoxueVedio',
  components: {
    Search,
    TitleMenu,
    VedioList,
    Icon
  },
  data() {
    return {
      isSelect: false,
      activeId: '1',
      bigTitle: '',
      menus: []
    }
  },
  mounted() {
    this.getVedioList()
  },
  methods: {
    handleActive() {
      this.isSelect = (!this.isSelect)
    },
    // 获取秘钥按钮
    async handleMenu($event) {
      this.activeId = $event.itemId
      if ($event.itemPath) {
        this.$router.push($event.itemPath)
      }
      const oriralSign = 'eDu_51Cto_siyuanTlw'
      const str = $event.item.fileId + oriralSign
      // eslint-disable-next-line no-undef
      const sign = window.MD5(str).toString()
      // 获取对应的Secret
      const _secret = await this.getSceret($event.item.fileId, sign)
      // eslint-disable-next-line no-undef
      const _deSecret = window.decode(_secret, $event.item.fileId)
      // eslint-disable-next-line no-undef
      const _base64Secret = Base64.encode(_deSecret)
      Dialog.alert({
        title: '解码信息',
        messageAlign: 'left',
        allowHtml: true,
        width: 820,
        message: `
        <span>标题： <input style="border:none;width:84%" value="${$event.item.title}"/></span>
        <span>ID： ${$event.item.fileId}</span>
        <span>m3u8地址：<input style="border:none;;width:84%" value="${$event.item.m3u8}"/></span>
        <span>IV： ${$event.item.IV}</span>
        <span>秘钥：<input style="border:none;;width:84%" value="${_base64Secret}"/></span>`,
        theme: 'round-button'
      })
    },
    handleSearch($event) {
      console.log('KeyWord: >>' + $event)
      // 根据课程ID搜索
      this.getVedioList($event)
    },
    async getVedioList(courseId) {
      // 根据课程ID获取视频列表  || 10543
      const contentId = courseId || '20104'
      const res = await request.post({
        url: '/course/courses/contents',
        data: {
          'contentIds': [{ 'contentId': contentId, 'type': 'COURSE_PLATFORM' }]
        }
      })
      // 数据转换处理
      if (Array.isArray(res)) {
        const _data = res[0]
        this.bigTitle = _data.title
        // 格式化数据
        this.menus = this.formatList(_data.children)
        console.log('getVedioList :>> ', this.menus)
      }
    },
    // 获取秘钥
    async getSceret(id, sign) {
      id = id || 461953
      sign = sign || '06f1d6d383e45d899dc34707a2382c29'
      const _url = `https://saas-api.51cto.com/file/files/video/secret?type=FILE_PLATFORM&id=${id}&sign=${sign}`
      const res = await request.get({
        url: _url
      })
      return res
    },
    formatList(vedioList) {
      // 格式化数据添加m3u8、偏移量等数据
      vedioList.forEach(item => {
        if (item.children && item.children.length) {
          this.formatList(item.children)
        }
        item.IV = '0x0123456789abcdef0123456789abcdef'
        item.m3u8 = `https://saas-api.51cto.com/file/files/video/m3u8?id=${item.fileId}&dp=hd&type=FILE_PLATFORM`
      })
      return vedioList
    }
  }
}
</script>
<style lang="less" scoped>
  .home-menu{
     background: @white;
     .duoxueVideo{
        text-align: left;
      }
  }

</style>
