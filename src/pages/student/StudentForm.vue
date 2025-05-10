<template>
    <div class="card mt-10" v-if="formview == 1">
        <div class="card-body">
            <form @submit.prevent="submitStudent">

                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Name</label>
                        <input v-model="student.name" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Contact</label>
                        <input v-model="student.contact" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Aadhaar</label>
                        <input v-model="student.adhar" type="text" class="form-control" />
                    </div>
                </div>

                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Email</label>
                        <input v-model="student.email" type="email" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Age</label>
                        <input v-model="student.age" type="number" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Gender</label>
                        <select v-model="student.gender" class="form-select">
                            <option disabled value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Institute</label>
                        <input v-model="student.university_name" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Courses</label>
                        <select v-model="student.course_name" class="form-select" >
                            <option v-for="course in UNIVERSITY_COURSES" :key="course.name" :value="course.name">
                                {{ course.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label>Account Holder Name</label>
                        <input v-model="student.account_name" type="text" class="form-control">
                    </div>
                    <div class="mb-3 col-md-4">
                        <label>Account Number</label>
                        <input v-model="student.account_number" type="number" class="form-control">
                    </div>
                    <div class="mb-3 col-md-4">
                        <label>IFSC Code</label>
                        <input v-model="student.ifsc" type="text" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label>Select Country</label>
                        <select class="form-select" v-model="student.country">
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label>Select State</label>
                        <select class="form-select" v-model="student.state">
                            <option value="up">Up</option>
                            <option value="mp">Mp</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label>Select City</label>
                        <select class="form-select" v-model="student.city">
                            <option value="Noida">Noida</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" 
                            id="declaration" />
                        <label class="form-check-label" for="declaration">
                            I, hereby declare that all the information provided above is true, accurate, and complete to
                            the
                            best of my
                            knowledge.
                            I understand that any false information may result in rejection or removal of the patient's
                            record.
                        </label>
                    </div>
                </div>
                <button class="btn btn-success">
                    {{ editIndex === null ? 'Submit' : 'Update' }} Data
                </button>
            </form>
        </div>
    </div>
    <div class="card mt-10" v-if="formview == 0">
        <div class="cord-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Aadhaar No</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Institute</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, index) in students" :key="index">
                        <td>{{ s.name }}</td>
                        <td>{{ s.contact_of_student }}</td>
                        <td>{{ s.adhar }}</td>
                        <td>{{ s.email }}</td>
                        <td>{{ s.age }}</td>
                        <td>{{ s.gender }}</td>
                        <td>{{ s.university_name }}</td>
                        <td>{{ s.course_name }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="editStudent(index)">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-3">
                <label>Total {{ this.pagination.total }}</label><br>
                <button class="btn btn-sm btn-secondary me-2" :disabled="pagination.current_page === 1"
                    @click="changePage(pagination.current_page - 1)">
                    Previous
                </button>
                <span>Page {{ pagination.current_page }}</span>
                <button class="btn btn-sm btn-secondary ms-2"
                    :disabled="pagination.current_page * pagination.per_page >= pagination.total"
                    @click="changePage(pagination.current_page + 1)">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import Constants from '../../components/utilities/Constants.vue';
export default {
    mixins: [Constants],
    data() {
        return {
            student: {
                name: '',
                contact: '',
                adhar: '',
                email: '',
                age: '',
                gender: '',
                institute: '',
                account_number: '',
                account_name: '',
                ifsc: '',
                country: '',
                state: '',
                city: '',
                courses: [],
                contact_of_student: '',
                id: '',
                illness: '',
                media_link: '',
                mobile: '',
                my_occupation: '',
                name_of_student: '',
                course_name:'',
                university_name:''

            },
            pagination: {
                current_page: 1,
                per_page: 5,
                total: 0
            },
            // courseList: ['Math', 'Science', 'English', 'History'],
            students: [],
            formview: 0,
            editIndex: null,
            companyid:109
        }
    },
    mounted() {
        this.getstudentlogs();
    },
    methods: {
        getstudentlogs(page = 1) {
            axios
                .post(`api/student/lists?page=${page}`)
                .then((response) => {
                    console.log('response', response.data);
                    const { data, current_page, per_page, total } = response.data;

                    this.students = data.map((item) => {
                        let parsed = JSON.parse(item.jsontext);
                        // Parse inner courses string if present
                        
                        // try {
                        //     parsed.courses = JSON.parse(parsed.courses);
                        // } catch (e) {
                        //     parsed.courses = {};
                        // }
                        return {
                            id: item.id,
                            ...parsed
                        };
                    });
                    console.log(this.students);
                    this.pagination.current_page = current_page;
                    this.pagination.per_page = per_page;
                    this.pagination.total = total;
                })

                .catch((error) => {
                    console.error('Failed to fetch patient list:', error);
                });
        },
        submitStudent() {
            const { id, ...formWithoutId } = this.student;
            console.log(formWithoutId)
            const jsonEncoded = JSON.stringify(formWithoutId);
            const payload = {
                id: id,
                jsontext: jsonEncoded,
                companyid: this.companyid
               
            };
            console.log('submitstudent',payload);
            axios.post('api/student/form/create',payload)
                .then(response=>{
                    this.formview = 0;
                    this.getstudentlogs()
                })
                .catch(error=>console.log(error))
            
            // this.formview = 0;

            // if (this.editIndex !== null) {
            //     console.log(' under if this editIndex');
            //     this.students[this.editIndex] = { ...this.student }
            //     this.editIndex = null
            //     this.resetForm()
            // } else {
            //     console.log('under else')
            //     axios
            //         .post('/api/students', this.student)
            //         .then(() => {
            //             this.students.push({ ...this.student })
            //             this.resetForm()
            //         })
            //         .catch(() => {
            //             alert('Submission failed')
            //         })
            // }
        },
        editStudent(index) {
            this.student = { ...this.students[index] }
            this.editIndex = index
            this.formview = 1;
        },
        resetForm() {
            this.student = {
                name: '',
                contact: '',
                adhar: '',
                email: '',
                age: '',
                gender: '',
                institute: '',
                courses: []
            }
        },
        changePage(page) {
            if (this.pagination.current_page == page) {
                return;
            }

            if (page < 1 || page > this.pagination.last_page) {
                return;
            }
            this.pagination.current_page = page;
            this.page = page;
            this.getstudentlogs(page);
        },
    }
}
</script>