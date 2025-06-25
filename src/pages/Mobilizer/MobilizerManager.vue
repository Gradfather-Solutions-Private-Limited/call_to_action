<template>
    <div class="card mt-10" v-if="showMobilizerForm">
        <div class="card-body">
            <form @submit.prevent="submitMobilizer()">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="form.name">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label>Phone Number</label>
                        <input type="number" @input="handleMobileInput" class="form-control" v-model="form.mobile">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label>Email</label>
                        <input type="text" class="form-control" v-model="form.email">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="form.password">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control" v-model="form.confirmpassword">
                        <span v-if="passcheckerror" class="text-danger">{{ passcheckerror }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <button type="submit" class="btn btn-info">Sign Up</button>
                        <button class="btn btn-danger" style="margin-left:20px;" @click="closeForm()">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="card mt-10" v-else>
        <div class="col-md-12 text-end mt-10">
            <button class="btn btn-info" @click="openForm">Add Mobilizer</button>
        </div>
        <div class="card-body mt-10">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in mobilizerList" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.mobile }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="editmobilizer(item)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="col-md-12 mt-3 d-flex justify-content-end">
            <div class="pagination-controls">
                <button class="btn btn-sm btn-primary me-2" @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1">
                    Prev
                </button>

                <span class="page-number">Page {{ currentPage }}</span>

                <button class="btn btn-sm btn-primary ms-2" @click="changePage(currentPage + 1)"
                    :disabled="mobilizerList.length < perPage">
                    Next
                </button>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    data() {
        return {
            mobilizerList: [],
            isMobilizer: 1,
            // pagination: {
            //     current_page: 1,
            //     per_page: 5,
            //     total: 0
            // },
            currentPage: 1,
            perPage: 10,
            form: {
                id: 0,
                name: '',
                mobile: '',
                email: '',
                password: '',
                confirmpassword: '',
                ismobilizer: 1,
            },
            showMobilizerForm: false,
            passcheckerror: '',
            fetchcolumns: 'id,name,email,username,mobile'
        }
    },
    mounted() {
        this.getMobilizerList();
    },
    methods: {
        getMobilizerList() {

            let param = { ismobilizer: 1, noofrec: this.perPage, currentpage: this.currentPage, fetchcolumns: this.fetchcolumns };
            axios.post('api/users/fetch', param).then(response => {
                console.log('data', response.data);
                this.mobilizerList = response.data;
            })
                .catch((error) => {
                    console.log('Failed to fetch mobilizer list', error);
                });

        },
        handleMobileInput(event) {

            let digits = event.target.value.replace(/\D/g, '');
            if (digits.length > 10) {
                digits = digits.slice(0, 10);
            }
            this.form.mobile = digits;
        },
        editmobilizer(item) {


            this.form = {
                ismobilizer: 1,
                id: item.id,
                name: item.name,
                mobile: item.mobile,
                email: item.email,
            }
            this.showMobilizerForm = true;
        },
        changePage(page) {
            if (page < 1) {
                return;
            }
            this.currentPage = page;
            this.getMobilizerList();
        },

        openForm() {


            this.showMobilizerForm = true;
        },
        closeForm() {
            this.reset();
            this.showMobilizerForm = false;
        },
        submitMobilizer() {
            this.passcheckerror = '';
            if (this.form.password !== this.form.confirmpassword) {
                this.passcheckerror = 'Password do not match';
                return;
            }

            axios.post('api/users/create/update', this.form).then(response => {
                console.log('response', response.data);
                if (response.data.status == true) {
                    this.$store.dispatch("triggerNotification", {
                        message: response.data.message,
                        type: "success",
                    });
                    this.getMobilizerList();
                    this.closeForm();
                }
                else {
                    this.$store.dispatch("triggerNotification", {
                        message: response.data.message,
                        type: "success",
                    });
                }

            })
                .catch((error) => {

                    console.log(error)
                });
        },
        reset() {
            this.form = {
                id: 0,
                name: '',
                mobile: '',
                email: '',
                password: '',
                confirmpassword: '',
                ismobilizer: 1,
            }
            this.passcheckerror = '';
        }
    }

}
</script>
<style scoped>
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 0;
}

.page-number {
  font-weight: 500;
  font-size: 16px;
  border-radius: 5px;
  background-color: #f8f9fa;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
