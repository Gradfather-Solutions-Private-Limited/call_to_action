<template>
  <div class="customers">
    <div class="col-md-12">
      <div class="container">
        <div class="col-md-12 ">

          <div class="col-md-12 " v-if="isAudioPlaying">
            <div class="col-md-12 text-right">
              <button class="new-btn" @click="backPage()">Go Back</button>
            </div>
            <div class="row mt-10">
              <div class="col-md-4 col-sm-12">
                <div class="card border-dark-blue-theme mb-3">
                  <div class="card-header bg-dark-blue-theme text-white"> &nbsp; User's Information </div>
                  <div class="card-body ">
                    <h5>Username: {{ loggedinuser?.name ?? "N/A" }}</h5>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-12">
                <div class="card border-dark-blue-theme mb-3">
                  <div class="card-header bg-dark-blue-theme text-white"> &nbsp; Steno Test Information </div>
                  <div class="card-body text-dark">
                    <!-- <h5 class="card-title">Name: RKC Nawada</h5> -->
                    <h5>Test: {{ this.examDetails?.examContent?.name  ?? 'N/A'}} </h5>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-12">
                <div class="card border-dark-blue-theme mb-3">
                  <div class="card-header bg-dark-blue-theme text-white"> &nbsp; Time/Duration Information </div>
                  <div class="card-body text-dark">
                    <h5>Time: {{ (this.examDetails?.examContent?.timer / 60) ?? 'Unlimited' }} minutes.</h5>
                    <!-- <h5 class="card-title">Age: 22</h5> -->
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="d-flex flex-center mt-20">

              <div class="col-md-6 row">
                <div class="col-md-8">
                  <audio :src="this.examDetails?.examContent?.fileurl" controls ref="audioElement">
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div class="col-md-4 flex-row">
                 
                  <button class="new-btn" @click="skipAudio">Next</button>
                </div>
              </div>
            </div> -->
            <div class="col-md-12">
              <div class="card border-dark-blue-theme">
                <h5 class="card-header bg-dark-blue-theme text-white">Instructions</h5>
                <div class="card-body">
                  <h4>Listen Dictation Carefully Then Next To Type </h4>
                  <audio :src="this.examDetails?.examContent?.fileurl" controls ref="audioElement">
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div>
                  <div>
                    <br>
                    <br>
                    <!-- <form  method="POST"> -->
                    <!-- <input type="hidden" name="paragraph_id" value="1349"> -->
                    <button class="btn btn-lg btn-danger" style="height: 98%; width: 100%;" @click="skipAudio">Click
                      here to Start Steno test **</button>
                    <!-- </form> -->
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div v-if="!isAudioPlaying">
            <TypingTutor @backToProductPage="backPage"></TypingTutor>

            <!-- <textarea placeholder="Type something here..." class="form-control" rows="18" cols="30"
              v-model="answer"></textarea>
            <div class="text-end mt-10">
              <button class="new-btn" @click="submitAnswer()">Submit</button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import TypingTutor from '../TypingTutor.vue';


// import { mapState, mapActions } from "vuex";

export default {
  name: "Series List",
  components: { TypingTutor },
  //  props: ["examcontent","singleProductMapping"],
  data() {
    return {
      // viewno:0
      isAudioPlaying: true,
      answer: "",
    }
  },

  computed: {
    ...mapGetters(['loggedinuser', 'examDetails'])
  },
  methods: {
   
    playAudio() {
      const audio = this.$refs.audioElement;
      if (audio) {
        audio.play();
      }
    },
    skipAudio() {
      const audio = this.$refs.audioElement;
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset to the beginning
        this.isAudioPlaying = false;
      }
    },
    submitAnswer() {
      let param = {
        productid: this.examDetails?.singleProductMapping?.productid ?? 0, testseriesid: this.examDetails?.examcontent.id,
        transactiondate: new Date().toISOString().slice(0, 10), nooferror: 10, correctwords: 10,
        totalwords: 20, userid: this.loggedinuser?.id
      }
      // console.log("param ", param)
      axios.post('api/single/question/submit', param)
        .then(response => {
          this.$emit("backToProductPage");
          // this.$router.push({path: '/customer-purchase'})
        })
        .catch(error => console.log(error))

    },
    backPage() {
      this.isAudioPlaying = true;
      this.$parent.dispalyExam = 0
      this.$store.commit('assignviewno', 1);
    }

  },
  mounted() {
    // this.fetchPurchaseCourses();
    this.$store.commit("assignaddpageheading", 'Exam Portal');
    // console.log("exam content ", this.examDetails.examContent)
  },
};
</script>

<style>
.customers {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin-right: 5px;
}
</style>