<template>
    <div class="container mt-5">
        <h2 class="mb-4">Manage Records</h2>

      
        <div class="card mb-4">
            <div class="card-header">Create New Record</div>
            <div class="card-body">
                <form @submit.prevent="createRecord">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input v-model="newRecord.name" type="text" class="form-control" id="name"
                            placeholder="Enter name" required />
                    </div>

                    <div class="mb-3">
                        <label for="audio_file" class="form-label">Audio File</label>
                        <input type="file" class="form-control" @change="handleFileChange('audio_file')" />
                    </div>

                    <div class="mb-3">
                        <label for="result" class="form-label">Result</label>
                        <textarea v-model="newRecord.result" class="form-control" id="result"
                            placeholder="Enter result"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="font_file" class="form-label">Font File</label>
                        <input type="file" class="form-control" @change="handleFileChange('font_file')" />
                    </div>

                    <button type="submit" class="btn btn-primary">Create Record</button>
                </form>
            </div>
        </div>

       
        <div class="card">
            <div class="card-header">Existing Records</div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Audio File</th>
                            <th>Result</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in records" :key="record.id">
                            <td>{{ record.name }}</td>
                            <td>
                                <audio v-if="record.audio_file" controls>
                                    <source :src="`/storage/${record.audio_file}`" type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </td>
                            <td>{{ record.result }}</td>
                            <td>
                                <button @click="editRecord(record)" class="btn btn-warning btn-sm">Edit</button>
                                <button @click="deleteRecord(record.id)" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        
        <div v-if="editingRecord" class="card mt-4">
            <div class="card-header">Edit Record</div>
            <div class="card-body">
                <form @submit.prevent="updateRecord">
                    <div class="mb-3">
                        <label for="edit_name" class="form-label">Name</label>
                        <input v-model="editingRecord.name" type="text" class="form-control" id="edit_name" required />
                    </div>

                    <div class="mb-3">
                        <label for="edit_audio_file" class="form-label">Audio File</label>
                        <input type="file" class="form-control" @change="handleFileChange('audio_file', true)" />
                    </div>

                    <div class="mb-3">
                        <label for="edit_result" class="form-label">Result</label>
                        <textarea v-model="editingRecord.result" class="form-control" id="edit_result"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="edit_font_file" class="form-label">Font File</label>
                        <input type="file" class="form-control" @change="handleFileChange('font_file', true)" />
                    </div>

                    <button type="submit" class="btn btn-primary">Update Record</button>
                    <button @click="cancelEdit" class="btn btn-secondary ms-2">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            records: [],
            newRecord: { name: '', result: '', audio_file: null, font_file: null },
            editingRecord: null,
        };
    },
    created() {
    this.fetchRecords();
    },
    methods: {
  // Fetch existing records from the backend
  fetchRecords() {
    axios.get('/api/records').then(response => {
      this.records = response.data;
    });
  },

  // Handle file changes for both audio and font files
  handleFileChange(field, isEdit = false) {
    const fileInput = event.target;
    const file = fileInput.files[0]; // Get the selected file
    
    if (isEdit) {
      // If editing a record, update the editingRecord
      if (field === 'audio_file') {
        this.editingRecord.audio_file = file;
      } else if (field === 'font_file') {
        this.editingRecord.font_file = file;
      }
    } else {
      // If creating a new record, update the newRecord
      if (field === 'audio_file') {
        this.newRecord.audio_file = file;
      } else if (field === 'font_file') {
        this.newRecord.font_file = file;
      }
    }
  },

  // Create a new record and send it to the backend
  createRecord() {
    const formData = new FormData();
    formData.append('name', this.newRecord.name);
    formData.append('result', this.newRecord.result);

    if (this.newRecord.audio_file) {
      formData.append('audio_file', this.newRecord.audio_file);
    }

    if (this.newRecord.font_file) {
      formData.append('font_file', this.newRecord.font_file);
    }

    // Send the formData to the backend
    axios.post('/api/records', formData)
      .then(response => {
        // Add the new record to the local list of records
        this.records.push(response.data); 

        // Reset the new record form
        this.newRecord = { name: '', result: '', audio_file: null, font_file: null };
        
        // Optionally, you can re-fetch the records if you want a fresh state
        // this.fetchRecords();
      })
      .catch(error => {
        console.error('Error creating record:', error);
      });
  },

  // Edit a record
  editRecord(record) {
    this.editingRecord = { ...record }; // Copy the record data to the editing form
  },

  // Update the record
  updateRecord() {
    const formData = new FormData();
    formData.append('name', this.editingRecord.name);
    formData.append('result', this.editingRecord.result);

    if (this.editingRecord.audio_file) {
      formData.append('audio_file', this.editingRecord.audio_file);
    }

    if (this.editingRecord.font_file) {
      formData.append('font_file', this.editingRecord.font_file);
    }

    // Send the formData to the backend for updating the record
    axios.put(`/api/records/${this.editingRecord.id}`, formData).then(response => {
      const index = this.records.findIndex(record => record.id === this.editingRecord.id);
      this.records.splice(index, 1, response.data); // Update the record in the table
      this.editingRecord = null; // Reset the edit form
    });
  },

  // Cancel editing
  cancelEdit() {
    this.editingRecord = null;
  },

  // Delete a record
  deleteRecord(id) {
    axios.delete(`/api/records/${id}`).then(() => {
      this.records = this.records.filter(record => record.id !== id); // Remove the record from the list
    });
  }
}

}
</script>