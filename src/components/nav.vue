<template>
    <nav class="m-tab m-border-tb r-tab-filter">
        <nav-item v-for="item in translatedItems" :item="item" :is-selected="item.key === selected" @m-props-module="selectItem">
            {{item.text}}
            <i></i>
        </nav-item>
    </nav>
</template>
<script>
import NavItem from './nav-item.vue';
export default {
    props: {
        // 数据值
        items: {
            type: Array,
            require: true
        },
        // 是否选中
        selected: {
            type: null,
            require: true,
            twoWay: true
        },
    },
    computed: {
        translatedItems: function() {
            var _data = [];
            $.each(this.items, function(key, item) {
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
    methods: {
        selectItem(key) {
            if (this.selected !== key) {
                this.selected = key;
            }
        }
    },
    components: {
        NavItem,
    },
}
</script>
<style scoped lang="sass">
nav.r-tab-filter {
    display: table;
    width: 100%;
    table-layout: fixed;
    font-size: .3rem;
    a.g-cell {
        position: relative;
        text-align: center;
        color: #7c7c7c;
        .iconfont {
            font-size: .3rem;
        }
        &:active{
            background: #f3f3f3;
        }
    }
}

.hitme i:not(.iconfont) {
    border-color: #7c7c7c transparent transparent transparent;
    border-style: solid;
    border-width: .1rem .1rem 0 .1rem;
    width: 0px;
    height: 0px;
    display: inline-block;
    position: relative;
    top: -.05rem;
    zoom: 1;
    transition: 0.3s ease-in;
    transform: rotate(0deg);
}

a.g-cell.up.hitme {
    color: #22ac38;
}

.up.hitme>i {
    border-color: #22ac38 transparent transparent transparent;
    transform: rotate(180deg);
}
</style>
