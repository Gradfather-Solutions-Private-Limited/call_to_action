<template>
    <div>
        <div class="container-center" v-if="checkloadingst==1">
            <img src="../../assets/loading.gif" width="100" height="100">
        </div>
        <div class="container-message-center" v-if="checkloadingst==2">
            <img src="../../assets/loading.gif" width="100" height="100">
        </div>
    </div>
</template>
<script>
import Constants from './Constants.vue';
import { mapGetters } from 'vuex'
export default {
    mixins:[Constants],
    ...mapGetters([
			'loadingstatus'
	]),
    computed:{
        checkloadingst(){
            if(this.$store.state.loadingstatus == 1){
                return 1;
            }else if(this.$store.state.loadingstatus == 2){
                return 2;
            }else{
                return 0;
            }
        }
    }
}
</script>