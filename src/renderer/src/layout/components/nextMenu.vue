<template>
	<div v-if='nextMenuList.length <= 0'>
		<el-empty description="没有子级菜单" />
	</div>
	
	<template 
		v-for='item in nextMenuList'
		:key='item.id'
	>
		<!--判断二级有没有三级-->
		<el-menu-item v-if='hasChildren(item)' :index='item.path'>
			有子
		</el-menu-item>

		<!--二级菜单渲染-->
		<el-menu-item v-else>
			
			<el-icon>
				<component :is='item.meta.icon.replace("el-icon-","") || "user" ' />
			</el-icon>

			<template #title>
				<span>{{item.name}}</span>
			</template>

		</el-menu-item>

	</template>
</template>

<script setup>
import { reactive , onBeforeMount, onUpdated } from 'vue';

const props = defineProps({
	nextMenuList:Object
})

//生命周期
onBeforeMount(()=>{
	let nextMenuList = reactive( props.nextMenuList );
	
})
onUpdated(()=>{
	console.log(props.nextMenuList);
})

//判断当前二级下有没有三级
const hasChildren = ( item )=>{
	return item.children && !item.children.every( item=>item.meta.hidden );//hidden是布尔值
}

</script>