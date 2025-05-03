
    <template>
    <div class="container my-4">
        <div class="row g-3">
            <div class="col-md-3" >
                <div class="dash-widget">
                    <div class="dash-widgetimg">
                        <i class='bx bx-wallet card-icon text-warning'></i>
                    </div>
                    <div class="dash-widgetcontent">
                        <h5>
                            <sapn>858</sapn>
                        </h5>
                        <div class="text-muted">Total Balance</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" >
                <div class="dash-widget">
                    <div class="dash-widgetimg">
                        <i class='bx bx-user card-icon text-info'></i>
                    </div>
                    <div class="dash-widgetcontent">
                        <h5>
                            <sapn>785</sapn>
                        </h5>
                        <div class="text-muted">Bank Balance</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" >
                <div class="dash-widget">
                    <div class="dash-widgetimg">
                        <i class='bx bx-line-chart card-icon text-success'></i>
                    </div>
                    <div class="dash-widgetcontent">
                        <h5>
                            <sapn>525</sapn>
                        </h5>
                        <div class="text-muted">Cash Balance</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 " >
                <div class="dash-widget" >
                    <div class="dash-widgetimg">
                        <i class='bx bx-exit card-icon text-danger'></i>
                    </div>
                    <div class="dash-widgetcontent">
                        <h5>
                            <sapn>47</sapn>
                        </h5>
                        <div class="text-muted" style="line-height: 14px;">Total Serviceman</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-md-3">
                <div class="card bg-warning text-white text-center p-3">Total Disbursement</div>
            </div>
            <div class="col-md-3">
                <div class="card bg-info text-white text-center p-3">Total Outstanding</div>
            </div>
            <div class="col-md-3">
                <div class="card bg-dark text-white text-center p-3">Total Collection</div>
            </div>
            <div class="col-md-3">
                <div class="card bg-success text-white text-center p-3">Total Interest</div>
            </div>
        </div>

        <!-- <div class="row g-3">
            <div class="col-md-6" >
                <div class="card p-3">
                    <h5>Daily Sales Report (DSR )</h5>
                    <div class="chart-container">
                        <div id="chart">
                            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-md-6" >
                <div class="card p-3">
                    <h5>Scheduled Meetings</h5>
                    <div>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Visitor Name</th>
                                    <th>Mobile No</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            leftDrawerOpen: false,
            users: 0,
            records: 0,
            apprecords: 0
        }
    },
    computed: {
        ...mapGetters(['loggedinuser'])
    },
    mounted() {
        this.refresh();
    },
    methods: {
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },
        refresh() {
        },
    },
}
</script>

<style scoped>
.grd-bg-info {
    background-color: #80d3f9;
}

.grd-orange {
    background: #FF9933;
}

.bg-green,
.bg-green>.small-box-footer {
    background-color: #138808;
    color: black;
}

.grd-white {
    background: white;
    color: black;
}

.grd-white-color {
    color: black;
}

.chakra {
    background-image: url(../assets/flagchakra2.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

}

@media (max-width: 768px) {
    .col-6 {
        flex: 0 0 auto;
        width: 100%;
    }
}
.dash-widget {
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    background: #fff;
    margin-bottom: 0px;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #dbe0e6;
}

.dash-widgetimg {
    padding: 10px;
    font-size: 25px;
}

.dash-widgetimg i {
    width: 48px;
    height: 48px;
    background: rgba(249, 110, 111, .12);
    justify-content: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    border-radius: 50px;
    text-align: center;
    padding-top: 11px;
}

.dash-widgetcontent {
    margin-left: 18px;
    display: grid;
    line-height: 5px;
    margin-top: 0px;
}

.dash-widgetcontent h5 {
    font-size: 17px;
}

</style>
