<template>
    <div class="card mt-10" v-if="showForm">
        <div class="card-body">
            <form @submit.prevent="submitEmployee()">
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
            <buttton class="btn btn-info" @click="openForm">Add Employee</buttton>
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
                    <tr v-for="(item, index) in employeeList" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.mobile }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="editemployee(item)">Edit</button>
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
                    :disabled="employeeList.length < perPage">
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
            employeeList: [],
            isemployee: 1,
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
                isemployee: 1,
            },
            showForm: false,
            passcheckerror: '',
            fetchcolumns: 'id,name,email,username,mobile'
        }
    },
    mounted() {
        this.getEmployeeList();
    },
    methods: {
        getEmployeeList() {
            let param = { isemployee: 1, noofrec: this.perPage, currentpage: this.currentPage, fetchcolumns: this.fetchcolumns };
            axios.post('api/users/fetch', param).then(response => {
                console.log('data', response.data);
                this.employeeList = response.data;
            })
                .catch((error) => {
                    console.log('Failed to fetch employee list', error);
                });

        },
        handleMobileInput(event) {

            let digits = event.target.value.replace(/\D/g, '');
            if (digits.length > 10) {
                digits = digits.slice(0, 10);
            }
            this.form.mobile = digits;
        },
        editemployee(item) {

            this.form = {
                isemployee: 1,
                id: item.id,
                name: item.name,
                mobile: item.mobile,
                email: item.email,
            }
            this.showForm = true;
        },
        changePage(page) {
            if (page < 1) {
                return;
            }
            this.currentPage = page;
            this.getEmployeeList();
        },

        openForm() {

            this.showForm = true;
        },
        closeForm() {
            this.reset();
            this.showForm = false;
        },
        submitEmployee() {
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
                    this.getEmployeeList();
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
                isemployee: 1,
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
