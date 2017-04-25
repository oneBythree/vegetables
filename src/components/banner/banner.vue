<template>
    <div class="m-banner">
        <img :src="banner" alt="banner图片">
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        bannerSrc: {
            type: String,
            require: true,
            default: ''
        }
    },
    computed: {
        banner: function() {
            return '../../images/' + this.bannerSrc;
        }
    }
}
</script>

