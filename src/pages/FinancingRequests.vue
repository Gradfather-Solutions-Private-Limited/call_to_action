<template>
  <div class="financing-requests-table">
    <!-- <h2>Financing Requests</h2> -->

    <!-- Filters -->
    <div class="filters">
      <input type="text" v-model="financingFilters.userName" placeholder="Search by User Name" @input="applyFilters" />
      <input type="text" v-model="financingFilters.productName" placeholder="Search by Product Name"
        @input="applyFilters" />
      <select class="form-control" v-model="financingFilters.status" @change="applyFilters">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <!-- Financing Requests Table -->
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>User Name</th>
          <th>Phone No</th>
          <th>Status</th>
          <th>Date Requested</th>
          <!-- <th>Actions</th> -->
          <th style="width: 50%;">Documents</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in financingRequests" :key="index">
          <td>{{ request.product?.name ?? 'N/A' }}</td>
          <td>{{ request?.product?.sp ?? 0 }}</td>
          <td>{{ request.username }}</td>
          <td>{{ request.phoneNo }}</td>
          <td>
            <select v-model="request.status" @change="updateStatus(request.id, request.status)">
              <option value="0">Pending</option>
              <option value="1">Approved</option>
              <option value="2">Rejected</option>
            </select>
          </td>
          <td>{{ formatDate(request.created_at) }}</td>
          <!-- <td>
            <button @click="openDocument(request.id)">View Documents</button>
          </td> -->
          <td style="width: 50%;">
            <div class="row">
              <div class="col-md-4" v-for="(doc, i) in request.documents" :key="i">
                <a :href="doc?.images?.downloadurl" target="_blank">{{ getDocumentName(doc) }}</a>
              </div>
            </div>
            <!-- <ul>
              <li v-for="(doc, index) in request.documents" :key="index">
                <a :href="doc.url" target="_blank">Document {{ index + 1 }}</a>
              </li>
            </ul> -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <!-- <div class="pagination">
      <button @click="prevPage" :disabled="financingPagination.currentPage === 1">Previous</button>
      <span>Page {{ financingPagination.currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="financingPagination.currentPage === totalPages">Next</button>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FinancingRequestsTable',
  computed: {
    ...mapGetters(['financingRequests', 'financingPagination', 'financingFilters']),

    totalPages() {
      return Math.ceil(this.financingPagination.totalRequests / this.financingPagination.pageSize);
    },
  },
  methods: {
    ...mapActions(['fetchFinancingRequests', 'setFinancingCurrentPage', 'updateRequestStatus', 'setfinancingFilters']),
    formatPrice(price) {
      return `${price?.toFixed(2)}`;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    openDocument(requestId) {
      const request = this.financingRequests.find(req => req.id === requestId);
      if (request && request.documents.length > 0) {
        window.open(request.documents[0].url, '_blank');
      }
    },
    nextPage() {
      if (this.financingPagination.currentPage < this.totalPages) {
        this.setFinancingCurrentPage(this.financingPagination.currentPage + 1);
      }
    },
    prevPage() {
      if (this.financingPagination.currentPage > 1) {
        this.setFinancingCurrentPage(this.financingPagination.currentPage - 1);
      }
    },
    updateStatus(requestId, status) {
      this.updateRequestStatus({ requestId, status });
    },
    applyFilters() {
      this.setFilters(this.filters);
    },
    getDocumentName(doc){
      let name = '';
      console.log(doc);
      switch (doc.documenttype) {
        case 'selfie': name = 'Selfie'; break;
        case 'adharfront': name = 'Addhar Front'; break;
        case 'adharback': name = 'Addhar Back'; break;
        case 'pancard': name = 'Pancard'; break;
        case 'gst': name = 'GST'; break;
        case 'gst': name = 'GST'; break;
        case 'shop_image': name = 'Shop Image'; break;
        case 'sign': name = 'Signature'; break;
        default:
          break;
      }
      return name;
    }
  },
  mounted() {
    this.fetchFinancingRequests();
    this.$store.commit("assignaddpageheading", 'Financial Request');
  }
}
</script>

<style scoped>
.financing-requests-table {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  max-width: 100%;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

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
  background-color: #f4f4f4;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
}

button {
  padding: 3px 3px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  margin: 0 10px;

}

.btnstyle {
  font-size: 13px;
  height: auto;
}
</style>