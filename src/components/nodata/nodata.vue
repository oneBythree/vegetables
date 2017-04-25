<template>
    <div class="m-nodata" v-if="isNoData">
    	暂无数据 /(ㄒoㄒ)/~~
    </div>
</template>
<script>
export default {
    props: {
        isNoData: {
            require: true,
            type: Boolean,
            default: false
        }
    }
}
</script>
<style>
.m-nodata{
	font-size: .3rem;
	text-align: center;
	margin-top: 1.2rem;
}	
</style>