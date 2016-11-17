<template>
    <header class="m-header">
        <a href="javascript:;" class="left-icon">
            <i class="iconfont icon-back"></i>
        </a>
        <a href="javascript:;" class="right-icon">
            <i class="iconfont icon-more"></i>
        </a>
        <h1>蔬菜进场</h1>
    </header>
    <div class="m-content">
        <nav class="m-tab m-border-tb r-tab-filter">
            <a class="g-cell r-filter-timer" @click="toggleDrop('timer',$event)">
                进场时间
                <span class="m-caret-down"></span>
            </a>
            <a class="g-cell r-filter-weight " @click="toggleDrop('weight')">
                重量
                <i class="iconfont icon-filter-down"></i>
            </a>
            <a class="g-cell" @click="toggleDrop(weight)">
                筛选
                <i class="iconfont icon-filter"></i>
            </a>
        </nav>
        <div class="m-props-module r-props-timer">
            <div class="m-props-content m-border-tb {{drop.classe}}">
                <a href="javascript:;" class="item m-border">顺序</a>
                <a href="javascript:;" class="item m-border">倒序</a>
            </div>
        </div>
        <dl class="g-list r-list m-border">
            <dt>
                <strong>供应商</strong>
                <span>北京蓝波绿农科技有限公司</span>
            </dt>
            <dd class="g-table-fix">
                <div class="g-cell">
                    <strong>车牌号</strong>
                    <span>京AL5938</span>
                </div>
                <div class="g-cell">
                    <strong>总重量</strong>
                    <span>200.00</span>
                </div>
            </dd>
            <dd>
                <strong>产地</strong>
                <span>上海市奉贤区海湾镇</span>
            </dd>
            <dt>
                <strong>进场日期</strong>
                <span>2016-11-16</span>
            </dt>
        </dl>
        <dl class="g-list r-list m-border-tb">
            <dt>
                <strong>供应商</strong>
                <span>北京蓝波绿农科技有限公司</span>
            </dt>
            <dd class="g-table-fix">
                <div class="g-cell">
                    <strong>车牌号</strong>
                    <span>京AL5938</span>
                </div>
                <div class="g-cell">
                    <strong>总重量</strong>
                    <span>200.00</span>
                </div>
            </dd>
            <dd>
                <strong>产地</strong>
                <span>上海市奉贤区海湾镇</span>
            </dd>
            <dt>
                <strong>进场日期</strong>
                <span>2016-11-16</span>
            </dt>
        </dl>
    </div>
    <div class="m-cover" v-if="drop.flag" @click="closeDrop()"></div>
</template>
<style scoped lang="sass">
@import '../common/mui/css/mui.picker.css';
dl.r-list {
    background: #fff;
    font-size: .3rem;
    color: #7c7c7c;
    dd,
    dt {
        line-height: 175%;
    }
}

nav.r-tab-filter {
    display: table;
    width: 100%;
    font-size: .3rem;
    a.g-cell {
        position: relative;
        text-align: center;
        color: #7c7c7c;
        width: 33.33334%;
    }
    i.iconfont {
        font-size: .3rem;
    }
}

.up .m-caret-up,.up .m-caret-down {
    -webkit-transition:  0.3s ease-in 0s;
}

.m-props-module a.item {
    font-size: .3rem;
    display: block;
    color: #7c7c7c;
    line-height: .75rem;
    height: .75rem;
    &.m-border:last-of-type:after {
        width: 0;
    }
}

.m-caret-up {
    position: relative;
    top: - .28rem;
    width: 0;
    height: 0;
    border-left: .16rem solid transparent;
    border-right: .16rem solid transparent;
    border-bottom: .2rem solid #7c7c7c;
}

.m-caret-down {
    position: relative;
     top: .28rem;
    width: 0;
    height: 0;
    border-left: .16rem solid transparent;
    border-right: .16rem solid transparent;
    border-top: .2rem solid #7c7c7c;
}
</style>
<script>
export default {
    // import $ from 'zepto';
    data() {
            return {
                drop: {
                    flag: false,
                    classe: ''
                }

            }
        },
        ready: function() {

        },
        methods: {
            toggleDrop: function(type, el) {
                var thisEl = $(el.currentTarget);
                thisEl.addClass('up');
                thisEl.find('span').removeClass('m-caret-down').addClass('m-caret-up')
                switch (type) {
                    case 'timer':
                        this.drop.flag = true;
                        this.drop.classe = 'drop-show';
                        break;
                    default:
                        break;
                }
            },
            closeDrop:function(){
                this.drop.flag = false;
                this.drop.classe = 'drop-hide';
            }
        },
}
</script>
