<template>
	<div class='top-bar'>

		<div class="left-panel">

			<el-breadcrumb>
				<el-icon>
					<user />
				</el-icon>
				首页
			</el-breadcrumb>

		</div>

		<div class='right-panel'>
			<slot />
		</div>

	</div>
</template>


<script setup>

import { useRoute } from 'vue-router'
let route = useRoute();

</script>
	

<style scoped>
.top-bar{
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 50px;
	border-bottom: 1px solid #ebeef5;
	background: #fff;
	box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}
.left-panel{
	display: flex;
}
.el-breadcrumb{
	margin-left: 16px;
}
</style>