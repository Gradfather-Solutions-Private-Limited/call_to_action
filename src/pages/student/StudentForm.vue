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
    <div class="card mt-10" v-if="formview==0">
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
            <div class="mt-3">
          <button
            class="btn btn-sm btn-secondary me-2"
            :disabled="pagination.current_page === 1"
            @click="changePage(pagination.current_page - 1)"
          >
            Previous
          </button>
          <span>Page {{ pagination.current_page }}</span>
          <button
            class="btn btn-sm btn-secondary ms-2"
            :disabled="pagination.current_page * pagination.per_page >= pagination.total"
            @click="changePage(pagination.current_page + 1)"
          >
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
            pagination: {
                current_page: 1,
                per_page: 5,
                total: 0
            },
            courseList: ['Math', 'Science', 'English', 'History'],
            students: [],
            formview:0,
            editIndex: null
        }
    },
    mounted(){
        this.getstudentlogs();
    },
    methods: {
        getstudentlogs(page = 1) {
            axios
                .post(`api/student/lists?page=${page}`)
                .then((response) => {
                const { data, current_page, per_page, total } = response.data;

                this.students = data.map((item) => {
                    let parsed = JSON.parse(item.jsontext);
                    // Parse inner courses string if present
                    try {
                        parsed.courses = JSON.parse(parsed.courses);
                    } catch (e) {
                    parsed.courses = {};
                    }
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
            this.formview = 1;
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