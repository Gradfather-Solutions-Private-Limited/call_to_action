<template>
    <!-- <div class=" col-md-12" style="display: flex;justify-content: center" >
        <div style="width: 70%;padding: 20px;height: 400px;display: flex;align-items: center;background: #fff;">
            <canvas id="myChart" ></canvas>
        </div>
    </div> -->
    <div class="container">
        <div class="insight_section">
            <div class="row mt-20">
                <div class="col-md-11 ">
                    <div class="row p1020">
                        <div class="col-lg-3 col-md-3 col-4  ">
                            <div class="insight_div_1 col-md-12 row p-10">
                                <div class="col-md-4 flex-justify-center icon_bg">
                                    <img src="/src/assets/delivered.png" style="width: 90%;" />
                                </div>
                                <div class="col-md-8 inner">
                                    <p style="margin: 0px;">Delivered</p>
                                    <h4>{{ delivered ?? 0 }}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-4  ">
                            <div class="insight_div_2 col-md-12 row p-10">
                                <div class="col-md-4 flex-justify-center icon_bg">
                                    <img src="/src/assets/read.gif" style="width: 90%;" />
                                </div>
                                <div class="col-md-8 inner">
                                    <p style="margin: 0px;">Read</p>
                                    <h4>{{ seen ?? 0 }}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-4  ">
                            <div class="insight_div_3 col-md-12 row p-10">
                                <div class="col-md-4 flex-justify-center icon_bg">
                                    <img src="/src/assets/not.png" style="width: 90%;" />
                                </div>
                                <div class="col-md-8 inner">
                                    <p style="margin: 0px;">Undelivered</p>
                                    <h4>{{ undelivered ?? 0 }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="mt-10">
                        <button class="action_btn" style="background: #1d1b31;" @click="back()"><i class='bx bx-arrow-back'></i></button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 p1020 row mt-20 mb-20">
                <div class="col-md-10">
                    <!-- <h3>Insight</h3> -->
                    <div class="col-md-12 row">
                        <div class="col-md-5 row">
                            <div class="col-md-5 flex-row">
                                <label>Date : From</label>
                            </div>
                            <div class="col-md-7">
                                <input type="date" class="form-control" v-model="fromdate" />
                            </div>
                        </div>
                        <div class="col-md-5 flex-row">
                            <div class="col-md-5">
                                <label>Date : To</label>
                            </div>
                            <div class="col-md-7">
                                <input type="date" class="form-control" v-model="todate" />
                            </div>
                        </div>
                        <div class="col-md-2 flex-row">
                            <button class="action_btn" @click="fetchAlldata()"><i class='bx bx-search'></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <select class="form-control" @change="filterData($event)">
                        <option value="0">All</option>
                        <option value="1" >Delivered</option>
                        <option value="2">Seen</option>
                        <option value="3">Undelivered</option>
                    </select>
                </div>
                
            </div>

        </div>

        <div class="col-md-12">
            <div>
                <table class="table table-responsive" style="text-align: center;">
                    <thead>
                        <th>#</th>
                        <th>Mobile no.</th>
                        <th>Name</th>
                        <th>Sent</th>
                        <th>Seen</th>
                        <th>Undelivered</th>
                        <th>Credit Used</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in demothread" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item?.threads?.usermobile2 }}</td>                           
                            <td>{{ item?.threads?.customername }}</td>
                            <td>
                                <div v-if="item.deliverytime > 0"><i class='bx bx-check-double fs-20'></i></div>
                                <div v-else><i class='bx bx-x fs-20'></i></div>
                                <!-- <div v-else><i class='bx bx-check-double'></i></div> -->
                            </td>
                            <td>
                                <div v-if="item.seentime"><i class='bx bx-check-double fs-20'
                                        style="color: #00a5ff;"></i></div>
                                <div v-else><i class='bx bx-x fs-20'></i></div>
                            </td>
                            <td>
                                <div v-if="item.seentime == 0 && item.deliverytime == 0"><i
                                        class='bx bx-check fs-20'></i></div>
                                <div v-else><i class='bx bx-x fs-20'></i></div>
                            </td>
                            <td>
                                {{ item.credit }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
// import Chart from 'chart.js/auto';

// const label = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
// ];
// const data = {
//   labels: label,
//   datasets: [
//     {
//       label: 'Send Message',
//       data: [65, 59, 80, 81, 56, 55, 0],
//       borderColor: '#e86064',
//       backgroundColor: '#e86064',
//     },
//     {
//       label: 'Receive Mesage',
//       data: [10, 15, 30, 20, 60, 70, 40],
//       borderColor: '#4c0b4e',
//       backgroundColor: '#4c0b4e',
//     },
//     {
//       label: 'Delivered Message',
//       data: [19, 12, 2, 60, 90, 50, 40],
//       borderColor: '#007a80',
//       backgroundColor: '#007a80',
//     }
//   ]
// };
// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'bottom',
//       },
//     }
//   },
// };

export default {
    data() {
        return {
            tempid: 0,
            delivered: 0,
            seen: 0,
            fromdate: new Date().toISOString().slice(0, 10),
            todate: new Date().toISOString().slice(0, 10),
            threads: [],
            undelivered: 0,
            demothread: []
        }
    },
    computed: {

    },
    mounted() {
        this.$store.commit('assignaddpageheading', 'Insight')
        this.tempid = this.$route.params.tempid
        if (this.tempid > 0) {
            this.fetchAlldata()
        }
        // const myChart = new Chart(document.getElementById('myChart'),config)
    },
    methods: {
        fetchAlldata() {
            this.$store.commit('assignloadingstatus', 1)
            let param = { tempid: this.tempid, fromdate: this.fromdate, todate: this.todate }
            axios.post('api/threads/fetch/insights', param)
                .then((response) => this.processInsightResponse(response.data))
                .catch((error) => console.log(error))
        },
        processInsightResponse(data) {
            console.log("Data here", data)
            // this.delivered = data.deliverytime
            // this.seen = data.seentime
            this.threads = data.threads
            this.demothread = this.threads
            if (this.threads.length>0) {
                this.allUpdate(this.threads)
            }
            this.$store.commit('assignloadingstatus', 0)
        },
        allUpdate(threads){
            this.delivered = threads?.filter(block => block.deliverytime > 0).length ?? 0
            this.seen = threads?.filter(block => block.seentime > 0).length ?? 0
            this.undelivered = threads?.filter(block => block.deliverytime == 0 && block.seentime == 0).length ?? 0
        },
        back() {
            this.$router.push({ path: '/wattsapp/templates' })
        },
        filterData(event){
            let value = event.target.value
            if(value==1){
                this.demothread = this.threads.filter(block=>block.deliverytime>0)
                this.delivered = this.threads?.filter(block => block.deliverytime > 0).length ?? 0
                this.seen = 0
                this.undelivered = 0
            }else if (value==2) {
                this.demothread = this.threads.filter(block=>block.seentime>0)
                this.seen = this.threads?.filter(block => block.seentime > 0).length ?? 0
                this.delivered = 0
                this.undelivered = 0
            } else if(value==3) {
                this.demothread = this.threads.filter(block=> block.deliverytime == 0 && block.seentime == 0)
                this.undelivered = this.threads?.filter(block => block.deliverytime == 0 && block.seentime == 0).length ?? 0
                this.delivered = 0
                this.seen = 0
            }else {
                this.demothread = this.threads
                this.allUpdate(this.threads)
            }
        }
    }
}
</script>
<style></style>