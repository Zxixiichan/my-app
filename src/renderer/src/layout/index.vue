<template>
  <div class="container">
    <!--一级菜单-->
    <div class="slider-split">
      <div class="slider-split-t">
        <router-link to="/">
          <img src="/images/logo.png" />
        </router-link>
      </div>
      <div class="slider-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for="item in menu" @click="showMenu(item)" :class="pmenu.path==item.path?'active':''">
              <el-icon>
                <component :is="item.meta.icon.replace('el-icon-', '')"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>

    <!--二级菜单-->
    <div :class="menuStore.menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
      <div class="adminui-side-top" v-if="!menuStore.menuIsCollapse">
        <h2>{{ pmenu.name }}</h2>
      </div>
      <!--二级菜单-->
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu router :collapse="menuStore.menuIsCollapse">
            <nextMenu :nextMenuList="nextMenuList"></nextMenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <!-- 收起 -->
      <div class="adminui-side-bottom" @click="menuStore.toggle_nextMenu">
        <el-icon>
          <Fold v-if="menuStore.menuIsCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
    </div>

    <!--主体内容-->
    <div class="main">
      <!-- 头部 -->
      <topBar>
        <userBar></userBar>
      </topBar>
      <!-- 导航 -->
      <tags></tags>
      <!-- 主体内容 -->
      <div>
      下面内容
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import topBar from './components/topBar.vue'
import userBar from './components/userBar.vue'
import tags from './components/tags.vue'
import { useMenuStore } from '@store/useMenuStore'
import nextMenu from './components/nextMenu.vue'
let menuStore = useMenuStore()
// console.log(menuStore.menuList)
import {useRoute} from 'vue-router'
let route = useRoute()
// 所有菜单数据
let menu = ref([])
// 当前菜单数据
let pmenu = ref(null)
// 二级菜单数据
let nextMenuList = ref([])
// 生命周期
onBeforeMount(()=>{
  menu.value = menuStore.menuList
  // pmenu初始化的值
  pmenu.value = route.name?route:{}
})
//点击一级菜单
const showMenu = (item) => {
  pmenu.value = item
  nextMenuList.value = item.children 
}
</script>

<style scoped>
.el-container {
  padding-top: 20px;
  background-color: #fff;
}
.container {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
}
.slider-split {
  width: 60px;
  height: 100%;
  background: #363b5a;
  cursor: pointer;
}
.slider-split-t {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.slider-split-t img {
  width: 30px;
  height: 30px;
}
.slider-split-scroll {
  color: #fff;
}
.slider-split-scroll li {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.slider-split-scroll li i {
  font-size: 20px;
  margin-top: 6px;
}
.slider-split-scroll ul li {
  display: flex;
  width: 60px;
  height: 70px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.active {
  background-color: blue;
}
</style>
