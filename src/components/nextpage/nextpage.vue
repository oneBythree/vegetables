<template>
    <div class="m-nextpage" v-if="isPageNext" @click="showNextData()">点击查看下一页(当前{{cur}}页 | 共{{all}}页)</div>
</template>
<script>
export default {
    props: {
        isPageNext: {
            require: true,
            type: Boolean,
            default: false
        },
        cur: {
            require: true,
            type: Number,
            dafault: 1
        },
        all: {
            require: true,
            type: Number,
        },
        nextPageText: {
            require: true,
            type: String,
            default: '点击查看下一页'
        }
    },
    methods: {
        showNextData: function() {
            this.$dispatch('next-page');
        }
    },
    computed: {
        isPageNext: function() {
            return this.cur >= this.all ? false : true;
        }
    }

}
</script>
<style>
.m-nextpage {
    margin-bottom: .2rem;
    padding: .2rem 0;
    font-size: .3rem;
    border: 1px solid #e7e7e7;
    background: #fff;
    text-align: center;
}

.m-nextpage:active {
    background: #fafafa;
}
</style>
