<style type="text/css">
.mui-col-xs-6 {
    float: left;
}

.listitem {
    margin-bottom: 15px;
    padding: 10px;
}

.right-icon {
    float: right;
    margin-top: 12px;
    font-size: 20px;
}

.m-popover {
    width: 100px;
    text-align: center;
}
</style>
<script type="text/javascript">
export default {
    data() {
            return {

            }
        },
        ready: function() {
            mui.init();
        },
        methods: {
          addLink:function(){
            mui('#topPopover').popover('toggle');
            this.$route.router.go({path:'/setting'})
          }
        }
}
</script>
<template>
    <!-- 主页面容器 -->
    <div class="mui-inner-wrap">
        <!-- 主页面标题 -->
        <header class="mui-bar mui-bar-nav">
            <a v-link="{ path: '/list' }" class="mui-icon mui-icon-left-nav"></a>
            <h1 class="mui-title">蔬菜进场管理</h1>
            <!-- v-link="{ path: '/setting?info=222' }" -->
            <a href="#topPopover" class="iconfont icon-setting right-icon"></a>
        </header>
        <div class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll">
                <!-- 主界面具体展示内容 -->
                <div class="mui-content">
                    <div class="mui-content mui-table-view listitem">
                        <div class="mui-row clearfix">
                            <div class="mui-col-xs-12">
                                <p>
                                    <strong>供应商名称</strong>
                                    <span>北京蓝波绿农科技有限公司</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-12">
                                <p>
                                    <strong>产地</strong>
                                    <span>福建省宁德市古田县</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>运输车牌号</strong>
                                    <span>京AR0597</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>总重量</strong>
                                    <span>10.35</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>进场日期</strong>
                                    <span>2016-11-07</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>操作时间</strong>
                                    <span>2016-11-07</span>
                                </p>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>
                    <div class="mui-content mui-table-view listitem">
                        <div class="mui-row clearfix">
                            <div class="mui-col-xs-12">
                                <p>
                                    <strong>供应商名称</strong>
                                    <span>北京蓝波绿农科技有限公司</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-12">
                                <p>
                                    <strong>产地</strong>
                                    <span>福建省宁德市古田县</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>运输车牌号</strong>
                                    <span>京AR0597</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>总重量</strong>
                                    <span>10.35</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>进场日期</strong>
                                    <span>2016-11-07</span>
                                </p>
                            </div>
                            <div class="mui-col-xs-6">
                                <p>
                                    <strong>操作时间</strong>
                                    <span>10.35</span>
                                </p>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="topPopover" class="mui-popover m-popover">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"><a href="#topPopover">删除</a></li>
                <li class="mui-table-view-cell"><a href="javascript:;" @click="addLink()">添加</a></li>
            </ul>
        </div>
    </div>
</template>
