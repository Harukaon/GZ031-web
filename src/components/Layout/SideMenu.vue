<template>
  <div class="side-menu">
    <div class="logo">MES系统</div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeMenu"
      unique-opened
      router
    >
      <template v-for="menu in menuData">
        <el-submenu :key="menu.id" :index="menu.id">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          
          <template v-for="subMenu in menu.children">
            <el-submenu :key="subMenu.id" :index="subMenu.id" v-if="subMenu.children">
              <template slot="title">
                <i :class="subMenu.icon"></i>
                <span>{{ subMenu.title }}</span>
              </template>
              
              <el-menu-item 
                v-for="item in subMenu.children" 
                :key="item.id" 
                :index="item.path"
              >
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
            
            <el-menu-item 
              v-else 
              :key="subMenu.id" 
              :index="subMenu.path"
            >
              <i :class="subMenu.icon"></i>
              <span>{{ subMenu.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menuData from './menu.js'

export default {
  name: 'SideMenu',
  data() {
    return {
      menuData
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.side-menu {
  height: 100%;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #444c56;
}

.el-menu {
  border-right: none;
}
</style> 