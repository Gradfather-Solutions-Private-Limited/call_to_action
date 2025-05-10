<template>
    <div class="card mt-10" v-if="showform">
        <div class="card-body">
            <form @submit.prevent="submitInstitute()">
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Name</label>
                        <input v-model="institute.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Mobile</label>
                        <input v-model="institute.mobile" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Email</label>
                        <input v-model="institute.email" type="text" class="form-control" />
                    </div>

                    <div class="mb-3 col-md-4">
                        <label class="form-label">Website </label>
                        <input v-model="institute.website_url" type="text" class="form-control" />
                    </div>

                    <div class="mb-3 col-md-4">
                        <label class="form-label">Full Address</label>
                        <input v-model="institute.address" type="texte" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">City</label>
                        <input v-model="institute.city" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">State</label>
                        <input v-model="institute.state" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Country</label>
                        <input v-model="institute.country" type="text" class="form-control" />
                    </div>

                </div>
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Courses</label>
                        <ul class="form-control">
                            <li v-for="course in UNIVERSITY_COURSES" :key="course.name">
                                <input type="checkbox" :id="course.name"
                                    :checked="institute.courses?.[course.name] || false"
                                    @click="courseItem($event, course)">
                                <label :for="course.name" class="ml-5">{{ course.name }}</label>
                            </li>
                        </ul>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Upload</label>
                        <div class="col-md-6 form-control" v-if="this.imageurl == ''">
                            <input type="file" @change="processFile2($event)">
                        </div>
                        <div class="mb-3" v-else>
                            <img class="" style="width: 300px;height: 250px;" :src="this.imageurl">
                        </div>
                    </div>
                </div>
                {{ editIndex }}
                <button v-if="editIndex === null" class="btn btn-success">
                    Submit
                </button>
                <input type="button" value="cancel" @click="cancel()" class="btn btn-danger">
            </form>
        </div>
    </div>
    <div class="card mt-10" v-else>
        <div class="col-md-12 text-end mt-10">
            <button class="btn btn-info" @click="this.showform = true">Add Institute</button>
        </div>
        <div class="cord-body mt-10">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, index) in institutes" :key="index">
                        <td>{{ s.name }}</td>
                        <td>{{ s.mobile }}</td>
                        <td>{{ s.email  }}</td>
                        <td>{{ s.is_approved==0?'Pending':'Approved' }}</td>
                        <td> 
                            <button class="btn btn-sm btn-primary" @click="editInstitute(s, index)">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger ml-5" @click="deleteInstitute(s)">
                                Delete
                            </button>
                            <button class="btn btn-sm btn-info ml-5" @click="approvalInstitute(s)">
                                Approval
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="">
            <div class="row">
                <div class=" text-right">
                    <label class="">Total Records {{ total_no_of_records }}</label>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-end pagina-extra" style="">
                            <li class="page-item ">
                                <a class="page-link" href="#" tabindex="-1"
                                    @click="goToPage(pagination.current_page - 1)"
                                    :disabled="pagination.current_page === 1">Previous</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">{{ pagination.current_page
                            }}</a></li>
                            <li class="page-item"><a class="page-link" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">{{ pagination.last_page }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#" @click="goToPage(pagination.current_page + 1)"
                                    :disabled="pagination.current_page === pagination.last_page">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Constants from '../../components/utilities/Constants.vue';
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue';
import { mapGetters } from 'vuex'
export default {
    mixins: [Constants, UploadMixin2],
    data() {
        return {
            id: 0,
            institute: {
                name: '',
                mobile: '',
                email: '',
                website_url: '',
                address: '',
                city: '',
                country: '',
                state: '',
                courses: null
            },
            institutes: [],
            editIndex: null,
            amazonid: 0,
            imageurl: '',
            selectedcourses: '',
            showform: false,
            total_no_of_records: 0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page: 1,
            companyid:109

        }
    },
    mounted() {
        this.getinstitutelogs();
        let obj = { 'type': 5, 'directorypath': 'shantiniketan/docs', 'counter': 0, 'typeid': 0, 'typeint': 18, 'width': 1000, 'height': 1000 }
        this.$store.commit('assignfilecomponents', obj);
    },
    computed: {
        ...mapGetters(['uploadedimage']),
    },
    methods: {
        getinstitutelogs() {
            let param = { page: this.page }
            axios.post('api/university/lists', param)
                .then(response => {
                    const { data, current_page, per_page, total } = response.data;
                    this.institutes = data.map((item) => {
                        let parsed = JSON.parse(item?.jsontext);
                        return {
                            id: item.id,
                            is_approved:item.is_approved,
                            rolledback: item.rolledback,
                            ...parsed
                        };
                    });
                    console.log(this.institutes)
                    // this.institutes = response.data.data
                    this.total_no_of_records = response.data.total;
                    this.pagination.last_page = response.data.last_page;
                })
                .catch(error => console.log(error))
        },
        submitInstitute() {
            if (confirm('Do you want submit')) {
                let param = {
                    id: this.id, jsontext: JSON.stringify(this.institute), amazonid: this.amazonid, imageurl: this.imageurl,
                    companyid: this.companyid, selectedcourses: this.selectedcourses
                }
                axios.post('api/university/form/create', param)
                    .then(response => {
                        alert('Data save successfully')
                        this.resetForm()
                    })
                    .catch(error => console.log(error))
            }
        },
        resetForm() {
            this.id = 0
            this.institute = {
                name: '',
                mobile: '',
                email: '',
                website_url: '',
                address: '',
                city: '',
                country: '',
                state: '',
                courses: Object.fromEntries(
                    this.UNIVERSITY_COURSES.map(course => [course.name, false])
                )
            };
            this.amazonid = 0;
            this.imageurl = '';
            this.selectedcourses = '';
            this.editIndex = null; // Reset editIndex
            this.$nextTick(() => {
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            });
        },
        courseItem(event, item) {
            const isChecked = event.target.checked;

            // Ensure courses is an object
            if (!this.institute.courses || typeof this.institute.courses !== 'object') {
                try {
                    this.institute.courses = JSON.parse(this.institute.courses || '{}');
                } catch (error) {
                    console.error('Failed to parse courses:', error);
                    this.institute.courses = Object.fromEntries(
                        this.UNIVERSITY_COURSES.map(course => [course.name, false])
                    );
                }
            }

            // Update the specific course value
            this.institute.courses[item.name] = isChecked;

            // Update selected course IDs as a comma-separated string
            const selectedIds = this.UNIVERSITY_COURSES
                .filter(course => this.institute.courses[course.name])
                .map(course => course.id); // Assuming each course has an `id` property
            this.selectedcourses = selectedIds.join(',');

            // console.log(this.institute.courses, this.selectedcourses);
        },
        uploaded() {
            console.log(this.uploadedimage)
            this.amazonid = this.uploadedimage.amazonid ?? 0
            this.imageurl = this.uploadedimage?.images?.downloadurl
        },
        goToPage(page) {
            if (this.pagination.current_page == page) {
                return;
            }

            if (page < 1 || page > this.pagination.last_page) {
                return;
            }
            this.pagination.current_page = page;
            this.page = page;
            this.getinstitutelogs();
        },
        editInstitute(item, index) {
            this.id = item.id
            const selectedInstitute = this.institutes[index];
            const parsedData = JSON.parse(selectedInstitute.jsontext);

            // Populate the form with the selected institute's data
            this.institute = {
                name: parsedData.name || '',
                mobile: parsedData.mobile || '',
                email: parsedData.email || '',
                website_url: parsedData.website_url || '',
                address: parsedData.address || '',
                city: parsedData.city || '',
                country: parsedData.country || '',
                state: parsedData.state || '',
                courses: parsedData.courses || {},
                
            };

            // Ensure checkboxes reflect the correct state
            this.$nextTick(() => {
                this.UNIVERSITY_COURSES.forEach(course => {
                    const checkbox = document.getElementById(course.name);
                    if (checkbox) {
                        checkbox.checked = !!this.institute.courses[course.name];
                    }
                });
            });

            // Update the selected courses
            const selectedIds = this.UNIVERSITY_COURSES
                .filter(course => this.institute.courses[course.name])
                .map(course => course.id);
            this.selectedcourses = selectedIds.join(',');

            // Set the image URL and amazon ID if available
            this.amazonid = selectedInstitute.amazonid || 0;
            this.imageurl = selectedInstitute.imageurl || '';

            // Show the form
            this.showform = true;
        },
        cancel(){
            this.showform = false
            this.getinstitutelogs()                

        },
        deleteInstitute(item){
            if(confirm('Do you want to delete it ?')){
                let param = {id:item.id}
                axios.post('api/university/delete',param)
                    .then(response=>{
                        this.getinstitutelogs()
                    })
                    .catch(error=>console.log(error))
            }
        },
        approvalInstitute(item){
            if(confirm('Do you want to approve it ?')){
                let param = {id:item.id}
                axios.post('api/university/approval',param)
                    .then(response=>{
                        this.getinstitutelogs()
                    })
                    .catch(error=>console.log(error))
            }
        }
    }
}
</script>