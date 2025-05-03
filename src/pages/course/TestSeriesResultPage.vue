<template>
    <div class="container">
        <div class="col-md-12" v-if="showResult">
            <table class="table table-responsive">
                <thead>
                    <th>#</th>
                    <th>Test Name</th>
                    <th>Transaction Date</th>
                    <th>Total Words</th>
                    <th>Correct Words</th>
                    <th>Incorrect Word</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in results" :key="item.id" >
                        <td>{{ index+1 }}</td>
                        <td>{{ item.testseries?.name ?? 'N/A' }}</td>
                        <td>{{ item.transactiondate }}</td>
                        <td>{{ item.totalwords }}</td>
                        <td>{{ item.correctwords }}</td>
                        <td>{{ item.nooferror }}</td>
                        <td>
                            <button class="new-btn" @click="resultDetail(item.id)">Detail</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <TestSeriesResultDetail v-else :resultid="this.resultid" @returndasboard="cancel()" ></TestSeriesResultDetail>
    </div>
</template>
<script>
import TestSeriesResultDetail from './TestSeriesResultDetail.vue';
export default {
    components: {TestSeriesResultDetail},
    data() {
        return {
            results: [],
            showResult: true
        }
    },
    computed : {

    },
    mounted() {
        this.$store.commit("assignaddpageheading", 'Test Series Results');
        this.fetchResults()
    },
    methods: {
        fetchResults() {
            axios.post('api/test/series/result')
               .then(response => {
                    this.results = response.data.examresult;
                })
               .catch(error => {
                    console.log(error);
                });
        },
        resultDetail(id) {
            this.resultid = id;
            this.showResult = false;
        },
        cancel(){
            this.resultid = 0
            this.showResult = true; 
        }
    }
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #1d1b31;
  color: #fff;
}
</style>