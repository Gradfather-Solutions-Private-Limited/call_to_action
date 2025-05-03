<template>
  <div class="distributor-table">
    <!-- <div class="card-body">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="col-md-12"><span class="heading-border">Search Criteria Code</span></div>
              <div class="search-filters">
                <input v-model="searchCriteria.distributor_code" placeholder="Search by Dealer Code" @input="onSearch"
                  class="searchstyle form-control" />
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="col-md-12"><span class="heading-border">Search Criteria Status</span></div>
              <select v-model="searchCriteria.status" @change="onSearch" class="searchstyle  form-control">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="footer">
        <div class="card-body">
          <div class="col-md-12 mt-4">
            <button class="btn btn-primary">Search</button>


          </div>
        </div>
      </div> -->
    <table>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Company Address</th>
          <th>Distributor Code</th>
          <th>Documents</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(distributor, index) in distributors" :key="index">
          <td>{{ distributor.companyname }}</td>
          <td>{{ distributor.companyaddress }}</td>
          <td>{{ distributor.distributorcode }}</td>
          <td>
            <div class="row">
              <div class="col-md-4" v-for="(doc, i) in distributor.documents" :key="i">
                <a :href="doc?.images?.downloadurl" target="_blank">{{ getDocumentName(doc) }}</a>
              </div>
            </div>
            <!-- <ul>
              <li v-for="(doc, i) in distributor.documents" :key="i">
                <a :href="doc?.images?.downloadurl" target="_blank" rel="noopener noreferrer">
                  Document {{ i + 1 }}
                </a>
              </li>
            </ul> -->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="pagination">
      <button @click="prevPage" :disabled="distributorPagination.currentPage === 1"
        class="btn btn-primary btn-sm">Previous</button>
      <span>Page {{ distributorPagination.currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="distributorPagination.currentPage === totalPages"
        class=" btn btn-primary btn-sm">Next</button>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Distributors',
  data() {
    return {
      searchCriteria: {
        distributor_code: '',
        status: '',
      },
    };
  },
  computed: {
    ...mapGetters(['distributors', 'distributorPagination', 'addpageheading']),
    totalPages() {
      return Math.ceil(this.distributorPagination.totalDistributors / this.distributorPagination.pageSize);
    },
  },
  methods: {
    ...mapActions(['fetchDistributors', 'setDistributorSearchCriteria', 'setDistributorCurrentPage']),
    onSearch() {
      this.setDistributorSearchCriteria(this.searchCriteria);
    },
    nextPage() {
      if (this.distributorPagination.currentPage < this.totalPages) {
        this.setDistributorCurrentPage(this.distributorPagination.currentPage + 1);
      }
    },
    prevPage() {
      if (this.distributorPagination.currentPage > 1) {
        this.setDistributorCurrentPage(this.distributorPagination.currentPage - 1);
      }
    },
    getDocumentName(doc) {
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
        default:
          break;
      }
      return name;
    }
  },
  mounted() {
    this.$store.commit("assignaddpageheading", 'Distributor List')
    this.fetchDistributors();
  },
};
</script>

<style scoped>
.distributor-table {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  max-width: 100%;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  margin-top: 3%;
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
  font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin: 5px 0;
}

.searchstyle {
  padding: 5px;
  border-radius: 5px;
  margin-right: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
</style>