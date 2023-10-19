<template>
  <div class="sidebar">
    <div class="logo">
      管理后台
    </div>

    <!-- 减1px border-bottom的高度 -->
    <el-scrollbar class="scrollbar-main">
      <el-menu unique-opened router
        active-text-color="#ffd04b"
        background-color="#fff"
        class="menu-list"
      >
        <el-menu-item class="menu-item"
          v-for="(item) in menuList"
          :key="item.path"
          :index="item.path"
        >{{ item.title }}</el-menu-item>
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()
const menuList = ref([
  { title: '客户管理', path: '/customer/list' },
  { title: '激活码管理', path: '/activecode/list' },
  { title: '公告管理', path: '/notice/list' }
])

</script>

<style lang="scss" scoped>
.menu-list {
  border-right: none;
}
.menu-item {
  padding-left: 70px;
  &.active {
    background: #409eff;
  }
}
.sidebar {
  height: 100%;
  width: 250px;
  min-width: 250px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  .logo {
    height: 80px;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
    line-height: 80px;
  }
  .scrollbar-main{
    flex: 1;
    overflow-y: scroll;
    height: calc(100vh - 70px);
    padding-bottom: 30px;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
  }


}
</style>
