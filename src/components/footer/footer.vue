<template>
    <footer class="m-footer" v-if="isFooter">
        <div class="g-table-fix">
            <slot></slot>
        </div>
    </footer>
</template>
<script>
export default {
    props: {
        isFooter: {
            type: Boolean,
            require: true,
            default: false
        }
    }
}
</script>
