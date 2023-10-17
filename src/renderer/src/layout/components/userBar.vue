<template>
	<div class='user-bar'>
		
		<!--用户信息 + 切换用户-->


		<!--消息提醒-->
        <div class="panel-item">聊天通信</div>

        <!--下载-->
        <div class="panel-item" @click='down'>下载</div>

        <!--最小化-->
        <div class="panel-item" @click='min'>
            <el-icon><Minus /></el-icon>
        </div>

        <!--最大化-->
        <div class="panel-item" @click='max'>
            <el-icon><FullScreen /></el-icon>
        </div>

        <!--关闭-->
        <div class="panel-item" @click='close'>
            <el-icon><Close /></el-icon>
        </div>

	</div>
</template>

<script setup>


//下载 
const down = ()=>{

	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'open-window-down',
	})

}


//最小化
const min = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'min-window',
	})
}
	

//最大化
const max = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'max-window',
	})
}
	
//关闭
const close = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'close-window',
	})
}
</script>

<style scoped>
.user-bar{
	display: flex;
	align-items: center;
	margin-right: 16px;
}
.panel-item{
	padding: 0 16px;
}
</style>