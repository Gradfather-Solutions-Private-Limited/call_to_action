<template>
    <div>
        <!-- <div class="temp_head" style="position: relative;">
            <div class="row">
                <div class=" col-md-11">
                    <h4 class=" m0px">WhatsApp Gallery</h4>
                </div>
            </div>
        </div> -->
        <div class="col-md-12 row mt-20" style="padding: 0px 20px;" v-if="edititem==null">
            <div class="col-md-4" v-for="item in list" :key="item.id">
                <wattsapp-template-design :item="item"></wattsapp-template-design>
            </div>
        </div>
        <div v-else>
            <selected-whats-app-template :flow="this.flow"></selected-whats-app-template>
        </div>
    </div>
</template>
<script>
// import WattsAppTemplate from './WattsAppTemplate.vue';
import { mapGetters } from 'vuex';
import WattsappTemplateDesign from './WattsappTemplateDesign.vue';
import SelectedWhatsAppTemplate from './SelectedWhatsAppTemplate.vue';
export default {
    // components: { WattsAppTemplate },
    components: { WattsappTemplateDesign,SelectedWhatsAppTemplate },
    props:['flow'],
    data() {
        return {
            list: []
        }
    },
    computed: {
        ...mapGetters(['edititem'])
    },
    mounted() {
        this.$store.commit('assignaddpageheading','Whats App Gallery')
        this.getData();
    },
    methods: {
        getData() {
            //get the wattsapp templates
            // axios.post("api/threads/wattsapp/company/templates/fetch")
            axios.post("api/threads/wattsapp/company/templates/approved/fetch")
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data) {
            this.list = data.list

            //  this.$store.commit('assignlist',data.list);
            //  console.log(this.list);
        },
       
    }
}
</script>