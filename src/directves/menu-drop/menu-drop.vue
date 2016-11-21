<template>
    <ul class="m-menu-drop" v-if="isMenu" transition="right">
        <menu-drop-item v-for="item in menuDatas" :item="item" @meu-select-fuc="meuSelectFuc"></menu-drop-item>
    </ul>
    <div class="m-content-warp2" v-if="isMenu" @click="hideMenuDrop"></div>
</template>
<script>
import MenuDropItem from './menu-drop-item.vue';
export default {
    props: {
        isMenu: {
            type: Boolean,
            require: false,
            default: false
        },
        menuDatas: {
            type: Array,
            require: true
        },
        item: {
            type: Object,
            require: true
        },
        domEl: {
            type: String,
            require: true,
            default: 'r-meun-drop',
        }
    },
    ready: function() {
        this.hideMenuDrop();
        // console.log(this.isMenu);
    },
    methods: {
        //点击菜单选项
        meuSelectFuc: function(key) {
            this.isMenu = false;
            this.$dispatch('meu-select-click', key);
        },
        // 点击其他地方隐藏
        hideMenuDrop:function(){
             this.isMenu = false;
        }
    },
    computed: {
        menuData: function() {
            var _data = [];
            $.each(this.menuDatas, function(key, item) {
                if (typeof item === 'string') {
                    _data.push({
                        key: key,
                        item: item
                    })
                } else {
                    _data.push(item);
                }
            })
            return _data;
        }
    },
    components: {
        MenuDropItem
    }
}
</script>
