<template>
  <div class="panel-container">
    <div class="panel-header" v-if="$slots.header || currentMenuTitle">
      <div class="panel-title">
        <span v-if="currentMenuTitle">{{ currentMenuTitle }}</span>
        <slot name="header" v-else></slot>
      </div>
      <div class="panel-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="panel-divider" v-if="($slots.header || currentMenuTitle)"></div>
    <div class="panel-body">
      <slot></slot>
    </div>
    <div class="panel-divider" v-if="$slots.footer"></div>
    <div class="panel-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import menuData from '../Layout/menu.js'

export default {
  name: 'PanelTool',
  computed: {
    currentMenuTitle() {
      // 获取当前路由路径
      const currentPath = this.$route.path;
      
      // 寻找对应的菜单项
      const menuTitle = this.findMenuTitle(menuData, currentPath);
      return menuTitle || '未知页面';
    }
  },
  methods: {
    findMenuTitle(menus, path) {
      for (const menu of menus) {
        if (menu.path === path) {
          return menu.title;
        }
        if (menu.children && menu.children.length > 0) {
          const title = this.findMenuTitle(menu.children, path);
          if (title) {
            return title;
          }
        }
      }
      return null;
    }
  }
}
</script>

<style scoped>
.panel-container {
  background-color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 20px;
  overflow: hidden;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
}

.panel-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  line-height: 1;
}

.panel-divider {
  border-top: 1px solid #EBEEF5;
}

.panel-body {
  padding: 20px;
  color: #606266;
}

.panel-footer {
  padding: 10px 20px;
  background-color: #f9f9f9;
}
</style>
