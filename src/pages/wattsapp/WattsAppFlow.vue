<template>
    <div>
        <div class="col-md-12">
            <watts-app-template-gallery :flow="true"></watts-app-template-gallery>
        </div>
    </div>
</template>
<script>
import WattsAppTemplateGallery from './WattsAppTemplateGallery.vue';
export default {
    components: {WattsAppTemplateGallery},
    mounted() {
        this.$store.commit('assignaddpageheading','Whats App Flow')
    },
}
</script>