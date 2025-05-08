<template>
    <div class="card mt-10">
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
                        <input v-model="student.aadhaar" type="text" class="form-control" />
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
                        <input v-model="student.institute" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label">Courses</label>
                        <select v-model="student.courses" class="form-select" multiple>
                            <option v-for="course in courseList" :key="course" :value="course">
                                {{ course }}
                            </option>
                        </select>
                    </div>
                </div>

                <button class="btn btn-success">
                    {{ editIndex === null ? 'Submit' : 'Update' }} Data
                </button>
            </form>
        </div>
    </div>
    <div class="card mt-10">
        <div class="cord-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Institute</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, index) in students" :key="index">
                        <td>{{ s.name }}</td>
                        <td>{{ s.contact }}</td>
                        <td>{{ s.email }}</td>
                        <td>{{ s.institute }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="editStudent(index)">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            student: {
                name: '',
                contact: '',
                aadhaar: '',
                email: '',
                age: '',
                gender: '',
                institute: '',
                courses: []
            },
            courseList: ['Math', 'Science', 'English', 'History'],
            students: [],
            editIndex: null
        }
    },
    mounted(){
        this.getstudentlogs();
    },
    methods: {
        getstudentlogs(){
            
        },
        submitStudent() {
            if (this.editIndex !== null) {
                this.students[this.editIndex] = { ...this.student }
                this.editIndex = null
                this.resetForm()
            } else {
                aiox
                    .post('/api/students', this.student)
                    .then(() => {
                        this.students.push({ ...this.student })
                        this.resetForm()
                    })
                    .catch(() => {
                        alert('Submission failed')
                    })
            }
        },
        editStudent(index) {
            this.student = { ...this.students[index] }
            this.editIndex = index
        },
        resetForm() {
            this.student = {
                name: '',
                contact: '',
                aadhaar: '',
                email: '',
                age: '',
                gender: '',
                institute: '',
                courses: []
            }
        }
    }
}
</script>