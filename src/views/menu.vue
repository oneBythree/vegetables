<template>
    <header class="m-header">
        <a href="/login" class="left-icon">
            <i class="iconfont icon-back"></i>
        </a>
        <h1>肉菜追溯系统</h1>
    </header>
    <div class="m-content">
        <div class="g-table-fix r-menu">
            <div class="g-row">
                <a href="/list" class="g-cell m-border m-border-right">
                    <span class="icon-bg icon-come"></span>
                    <p>蔬菜进场管理</p>
                </a>
                <a href="javascript:;" class="g-cell m-border ">
                    <span class="icon-bg icon-save"></span>
                    <p>蔬菜检测管理</p>
                </a>
            </div>
            <div class="g-row">
                <a href="javascript:;" class="g-cell m-border m-border-right">
                    <span class="icon-bg icon-money"></span>
                    <p>蔬菜交易管理</p>
                </a>
                <a href="javascript:;" class="g-cell m-border ">
                    <span class="icon-bg icon-auth"></span>
                    <p>蔬菜进场管理</p>
                </a>
            </div>
        </div>
    </div>
</template>
<style scoped lang="sass">
.r-menu {
    text-align: center;
    background: #fff;
    a.g-cell {
        color: #545454;
        &:active {
            background: #cfcfcf;
        }
    }
    span.icon-bg {
        display: inline-block;
        margin: .72rem 0 .34rem;
        width: 1.13rem;
        height: 1.13rem;
        &.icon-come {
            background: url('../images/icon-come.png') center;
            background-size: 100% 100%;
        }
        &.icon-save {
            background: url('../images/icon-save.png') center;
            background-size: 100% 100%;
        }
        &.icon-money {
            background: url('../images/icon-money.png') center;
            background-size: 100% 100%;
        }
        &.icon-auth {
            background: url('../images/icon-auth.png') center;
            background-size: 100% 100%;
        }
    }
    p {
        margin: 0 0 .54rem 0;
        font-size: .32rem;
    }
}
</style>
