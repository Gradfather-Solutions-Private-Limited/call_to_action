<template>
    <div class="col-md-12">
        <div class="card mt-10" v-if="showBox">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="card-title">Vehicle Details</h5>
                    </div>
                    <div class="col-md-6 text-right">
                        <button @click="togglelBtn()" class="button-code1">ADD NEW</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive m-0">
                    <table class="table datatable" id="datatable_1">
                        <thead class="table-light">
                            <tr>
                                <th>Vehicle Number</th>
                                <th>Purpose</th>
                                <th>Material</th>
                                <th>Driver Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in vehicleNumbers">
                                <td>{{ item.vehicleno }}</td>
                                <td>
                                    <span :class="checkClass(item)">{{ getVehiclePurpose(item) }}</span>
                                </td>
                                <td>{{ getVehicleMaterial(item)  }}</td>
                                <td>{{ JSON.parse(item.jsontext)?.driverName ?? '' }}</td>
                                <td>
                                    <div class="d-flex flex-wrap gap-2">
                                        <button type="button" class="btn btn-outline-success btn-sm" @click="editVehicleForm(item)">
                                            <i class='bx bx-edit-alt' ></i>
                                        </button>

                                        <button type="button" class="btn btn-outline-danger btn-sm">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <vehicle-entry-form v-if="!showBox" :showBox="showBox"  :editVehicle="this.editVehicle"></vehicle-entry-form>
    </div>
</template>
<script>
import Constants from '../../components/utilities/Constants.vue';
import VehicleEntryForm from './VehicleEntryForm.vue';
export default {
    mixins:[Constants],
    components: { VehicleEntryForm },
    data() {
        return {
            vehicleNumbers: [],
            showBox: true,
            editVehicle: null
            // vehicleNumbers: [
            //     {
            //         vehicleNumber: "RJ13CB3185",
            //         purpose: "Driving",
            //         status: 2,
            //         material: "Aluminum",
            //         driverName: "John Doe"
            //     },
            //     {
            //         vehicleNumber: "RJ20CK4444",
            //         purpose: "Driving",
            //         status: 1,
            //         material: "Steel",
            //         driverName: "Jane Doe"
            //     },
            //     {
            //         vehicleNumber: "RJ20CK3333",
            //         purpose: "Driving",
            //         status: 2,
            //         material: "Steel",
            //         driverName: "John Doe"
            //     },
            //     {
            //         vehicleNumber: "RJ20CK3333",
            //         purpose: "Driving",
            //         status: 1,
            //         material: "Cement",
            //         driverName: "John Doe"

            //     },
            //     {
            //         vehicleNumber: "RJ15AB2222",
            //         purpose: "Driving",
            //         status: 0,
            //         material: "Cement",
            //         driverName: "John Doe"
            //     },
            //     {
            //         vehicleNumber: "RJ13CB3185",
            //         purpose: "Driving",
            //         status: 1,
            //         material: "Other",
            //         driverName: "John Doe"
            //     },
            //     {
            //         vehicleNumber: "UP7BEM5214",
            //         purpose: "Driving",
            //         status: 2,
            //         material: "Aluminum",
            //         driverName: "John Doe"
            //     },
            //     {
            //         vehicleNumber: "BR24GA9334",
            //         purpose: "Driving",
            //         status: 1,
            //         material: "Steel",
            //         driverName: "John Doe"

            //     },
            //     {
            //         vehicleNumber: "RJ13CB3185",
            //         purpose: "Driving",
            //         status: 0,
            //         material: "Cement",
            //         driverName: "John Doe"
            //     },
            // ],
        }
    },
    computed: {
        selectedItemsCount() {
            return this.selectedItems.length
        }
    },
    mounted() {
        this.refresh();
    },
    methods: {
        toggleSelection(item) {
            if (this.selectedItems.includes(item)) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
            } else {
                this.selectedItems.push(item)
            }
        },
        togglelBtn() {
            this.showBox = !this.showBox
        },
        refresh() {
            axios.post('api/vechile/numbers/fetch')
                .then((response) => {
                    this.vehicleNumbers = response.data.vehiclenumbers;

                })
                .catch((error) => console.log(error))
        },
        getVehiclePurpose(item) {
            const purpose = JSON.parse(item.jsontext)?.purpose;
            const name = this.PURPOSE.find(o => o.id == purpose)?.name
            return name ?? 'N/A';
        },
        checkClass(item){
            let danger = 'badge rounded-pill border bg-danger-subtle border-danger-subtle text-danger-emphasis'
            let warning = 'badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill'
            let success = 'badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill'
            let gray = 'badge bg-info-subtle border border-info-subtle text-info-emphasis rounded-pill'
            const purpose = JSON.parse(item.jsontext)?.purpose;
            if(purpose==1){
                return danger;
            }else if(purpose==2){
                return warning;
            }else if(purpose==3){
                return success;
            }else {
                return gray;
            }
        },
        getVehicleMaterial(item) {
            const material = JSON.parse(item.jsontext)?.material;
            const name = this.MATERIAL.find(o => o.id == material)?.name
            return name ?? 'N/A';
        },
        editVehicleForm(item){
            this.editVehicle = item;
            this.togglelBtn();
        }
    }
}
</script>
