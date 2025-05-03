// src/mixins/TestSeriesMixin.js
import axios from 'axios';

export default {
  data() {
    return {
      filteredSeries: [],
      filterProduct: '',
      allSeries: [],
    };
  },
  methods: {
    async fetchTestSeries() {
      try {
        const response = await axios.post('/api/single-question-exam/fetch');
        this.$store.commit('SET_TEST_SERIES', response.data);
        this.filteredSeries = this.$store.state.testSeries
        this.allSeries = this.$store.state.testSeries
        // this.filterTestSeries();
      } catch (error) {
        console.error('Error fetching test series:', error);
      }
    },
    // filterTestSeries() {
    //     console.log("Checking for the filter product")
    //     console.log(this.filterProduct)
    //     // console.log(this.filterProduct>0)
    //     if(this.filterProduct>0){
    //       console.log("Stage1")
    //       console.log(this.$store.state.testSeries)
    //       this.filteredSeries = this.$store.state.testSeries.filter((block)=> {
    //         let productString = block.productids??""
    //         let productArray = productString.split(",")
    //         return productArray.includes(this.filterProduct.toString())
    //       })
    //     } else {
    //       console.log("Stage2")
    //       this.filteredSeries = this.$store.state.testSeries
    //     }
    // },
    getProductById(id) {
      return this.$store.state.products.find(product => product.id === id);
    },
    filterTestSeries(){
      if(this.filterProduct>0){
        let param = {productid: this.filterProduct}
        axios.post('api/test/series/filter',param)
          .then((response)=>{
            this.$store.commit('SET_TEST_SERIES', response.data.series);
            this.filteredSeries = this.$store.state.testSeries
            console.log("FilteredSeries",this.filteredSeries)
          })
          .catch((error)=>console.log(error))
      }else {
        this.filteredSeries = this.allSeries
      }
     
    }
  },
};
