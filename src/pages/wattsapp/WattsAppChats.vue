<template>
    <div class="flex-align-center-start">
            <div class="col-md-4 border_right">
                <thread-ui></thread-ui>
            </div>
            <div class="col-md-8" v-if="selectedthread!=null">
                <messages></messages>
            </div>
    </div>
</template>
<script>
import ThreadUi from './ThreadUi.vue';
import Messages from './Messages.vue';
import { mapGetters } from 'vuex';
export default {
    components: {ThreadUi,Messages},
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['selectedthread'])
    },
    mounted(){
        this.$store.commit('assignaddpageheading','Chats')
    }
}
</script>