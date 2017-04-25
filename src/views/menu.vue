<template>
    <div>
        <v-header :header-title="headerText" :is-left-icon="isLeftIcon" :right-icon="rightIcon" @right-action="logout">
        </v-header>
        <div class="m-content">
            <div class="g-table-fix r-menu">
                <div class="g-row">
                    <a v-link="{path:'/retailVeg'}" class="g-cell m-border m-border-right">
                        <span class="icon-bg icon-veg"></span>
                        <p>蔬菜进场</p>
                    </a>
                    <a v-link="{path:'/retailMeat'}" class="g-cell m-border ">
                        <span class="icon-bg icon-meat"></span>
                        <p>肉品进场</p>
                    </a>
                </div>
                <div class="g-row">
                    <a v-link="{path:'/retailVeg/sales'}" class="g-cell m-border m-border-right">
                        <span class="icon-bg icon-veg-sales"></span>
                        <p>蔬菜销售</p>
                    </a>
                    <a v-link="{path:'/retailMeat/sales'}" class="g-cell m-border ">
                        <span class="icon-bg icon-meat-sales"></span>
                        <p>肉品销售</p>
                    </a>
                </div>
            </div>
        </div>
        <v-dialog :is-show-dialog.sync="isShowDialog" :type-icon="dialogIcon" :dialog-text="dialogText" @dialog-callback="dialogCallback" :cancel-text="cancelText">
            <slot name="defaultDialog"></slot>
        </v-dialog>
    </div>
</template>
<script>
import VHeader from '../components/header/header.vue';
import VDialog from '../components/dialog/dialog.vue';
import VLoading from '../components/loading/loading.vue';

export default {
    data() {
            return {
                headerText: JSON.parse(sessionStorage.getItem('userInfo')).node_name,
                // headerText: '111',
                isLeftIcon: false,
                rightIcon: 'icon icon-logout',
                isShowDialog: false,
                dialogIcon: 'icon-confirm',
                cancelText: '取消',
                dialogText: '是否退出登录？',
            }
        },
        ready: function() {
            $('.mui-dtpicker').hide();
            $('.mui-backdrop').remove();
        },
        methods: {
            logout: function() {
                this.isShowDialog = true;
            },
            dialogCallback: function() {
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('userInfo');
                this.$route.router.go('/login');
            },
        },
        components: {
            VHeader,
            VDialog,
            VLoading
        }
}
</script>
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
        &.icon-veg {
            background: url('../images/icon/icon-veg.png') center;
            background-size: 100% 100%;
        }
        &.icon-meat {
            background: url('../images/icon/icon-meat.png') center;
            background-size: 100% 100%;
        }
        &.icon-veg-sales{
            background: url('../images/icon/icon-veg-sales.png') center;
            background-size: 100% 100%;
        }
        &.icon-meat-sales{
            background: url('../images/icon/icon-meat-sales.png') center;
            background-size: 100% 100%;
        }
    }
    p {
        margin: 0 0 .54rem 0;
        font-size: .32rem;
    }
}
</style>
