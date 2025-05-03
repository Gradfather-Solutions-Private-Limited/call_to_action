<template>
    <div class="container">
        <div class="col-md-12 p1020">
            <!-- <h3>DashBoard</h3> -->
        </div>
        <div class="col-md-12">
            <div class="row p1020">
                <div class="col-lg-4 col-md-4 col-4  ">
                    <div class="insight_div_1 col-md-12 row p-10">
                        <div class="col-md-4 flex-justify-center icon_bg">
                            <img src="/src/assets/credit-card.gif" style="width: 90%;" />
                        </div>
                        <div class="col-md-8 inner">
                            <p style="margin: 0px;">Whats App Credit</p>
                            <h5>{{ this.creditused?.creditused ?? 0  }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-4  ">
                    <div class="insight_div_2 col-md-12 row p-10">
                        <div class="col-md-4 flex-justify-center icon_bg">
                            <img src="/src/assets/read.gif" style="width: 90%;" />
                        </div>
                        <div class="col-md-8 inner">
                            <p style="margin: 0px;">SMS Credit</p>
                            <h5>{{ this.creditused?.creditlimit ?? 0 }}</h5>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-lg-4 col-4 flex-justify-center text-center">
                    <div class="small-box " style="background: #bccef6;">
                        <div class="inner">
                            <h3>{{ dashboard.creditused?dashboard.creditused:0 }}</h3>
                            <p>Total Credit</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-4 flex-justify-center text-center">
                    <div class="small-box  " style="background: #c9c9e7;">
                        <div class="inner">
                            <h3>{{ dashboard.creditlimit?dashboard.creditlimit:0 }}</h3>
                            <p>Limit</p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            dashboard: []
        }
    },
    computed: {
        ...mapGetters(['creditused'])
    },
    mounted() {
        this.$store.commit('assignaddpageheading', 'Whats App Dashboard')
        this.$store.dispatch('fetchcreditused')

    },
    methods: {

        // refresh() {
        //     axios.post('api/threads/whatsapp/dashboard')
        //         .then((response) => this.processCreditResponse(response.data))
        //         .catch((error) => console.log(error))
        // },
        // processCreditResponse(data) {
        //     console.log(data)
        //     this.dashboard = data.dashboard
        // }

    }
}
</script>