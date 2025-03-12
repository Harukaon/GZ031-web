<template>
  <div class="panel-container" :class="[shadow ? `is-${shadow}-shadow` : '', {'is-always-shadow': alwaysShadow}]">
    <div class="panel-header" v-if="showTitle || $slots.header">
      <div class="panel-title">
        <span v-if="showTitle">{{ currentMenuTitle }}</span>
        <slot name="header" v-else></slot>
      </div>
      <div class="panel-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="panel-divider" v-if="(showTitle || $slots.header) && !hideHeaderDivider"></div>
    <div class="panel-body" :style="{padding: bodyPadding}">
      <slot></slot>
    </div>
    <div class="panel-divider" v-if="$slots.footer && !hideFooterDivider"></div>
    <div class="panel-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import menuData from '../Layout/menu.js'

export default {
  name: 'PanelTool',
  props: {
    // 面板标题
    title: {
      type: String,
      default: ''
    },
    // 是否使用自动标题（当前菜单名称）
    useMenuTitle: {
      type: Boolean,
      default: true
    },
    // 阴影显示时机
    shadow: {
      type: String,
      default: 'always', // always, hover, never
    },
    // 是否始终显示阴影
    alwaysShadow: {
      type: Boolean,
      default: true
    },
    // 是否隐藏标题下方分割线
    hideHeaderDivider: {
      type: Boolean,
      default: false
    },
    // 是否隐藏底部分割线
    hideFooterDivider: {
      type: Boolean,
      default: false
    },
    // 内容区域内边距
    bodyPadding: {
      type: String,
      default: '20px'
    }
  },
  computed: {
    // 判断是否需要显示标题
    showTitle() {
      return this.title || this.useMenuTitle;
    },
    
    // 获取当前菜单标题
    currentMenuTitle() {
      if (this.title) {
        return this.title;
      }
      
      // 获取当前路由路径
      const currentPath = this.$route.path;
      
      // 寻找对应的菜单项
      const menuTitle = this.findMenuTitle(menuData, currentPath);
      return menuTitle || '未知页面';
    }
  },
  methods: {
    // 递归查找菜单标题
    findMenuTitle(menus, path) {
      for (const menu of menus) {
        // 如果当前菜单项匹配路径
        if (menu.path === path) {
          return menu.title;
        }
        
        // 如果有子菜单，递归查找
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
}

.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.is-never-shadow {
  box-shadow: none;
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
