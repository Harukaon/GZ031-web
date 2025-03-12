<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu />
    </el-aside>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu.vue'

export default {
  name: "AppLayout",
  components: {
    SideMenu
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  width: 100%;
}

.el-aside {
  background-color: #545c64;
  color: #fff;
  height: 100%;
  overflow-x: hidden;
}

.el-main {
  padding: 10px;
  background-color: #f0f2f5;
}
</style>