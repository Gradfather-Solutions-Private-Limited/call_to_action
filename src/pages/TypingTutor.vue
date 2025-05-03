<template>
  <div>
    <div class="col-md-12" v-if="showSavebtn">
      <div class="mb-20">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-10">
              <h3>Typing Tutor</h3>
            </div>
            <div class="col-md-2 display_timer">
              <p v-if="timer > 0" class="m-0">Time left : {{ formattedTimer }} </p>
              <p v-else class="m-0">Time's up!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 card mt-10">
        <div class="row card-body">
          <div class="col-md-4">
            <label>Typed Word Count : </label> <span>{{ typedWordsCount }}</span>
          </div>
          <div class="col-md-4">
            <label>Typed Characters : </label> <span>{{ typedCharactersCount }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-12">
        <p :style="{ fontFamily: selectedFont }" class="correct-text"> {{ headText }} </p>
      </div> -->
      <div class="col-md-12" v-if="this.examDetails?.examContent?.texttype == 1">
        <div class="form-control no-select" :style="{ fontFamily: selectedFont }">
          {{ this.examDetails?.examContent?.answer }}
        </div>
      </div>
      <div class="col-md-12" v-if="this.initiateFonttype.id != 3">
        <textarea class="form-control" v-model="userInput" :style="{ fontFamily: selectedFont }" rows="10"
          @focus="startTimerIfNotStarted"></textarea>
      </div>
      <div class="col-md-12" v-else>
        <!-- <textarea class="form-control no-paste" id="counter-text" v-model="userInput" rows="5"
          @focus="startTimerIfNotStarted" @paste.prevent></textarea> -->
          <RemingtonGailText :userInput="userInput" @updateInput="updateUserInput" @focus="startTimerIfNotStarted" rows="10"></RemingtonGailText>
      </div>
      <div class="text-center" >
        <button @click="cancelTest()" class="btn btn-danger">Cancel test</button>
        <button @click="checkText" class="btn btn-success">Submit test</button>
      </div>
      <!-- <p class="result-text">
        <span v-for="(char, index) in comparisonResult" :key="index" :class="(char.isMismatch) ? 'mismatch' : 'match'">
          {{ char.character }}
        </span>
      </p> -->
    </div>
    <TestSeriesResultDetail v-else  :resultid="this.resultid" @returndasboard="cancelTest()" ></TestSeriesResultDetail>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import TestSeriesResultDetail from './course/TestSeriesResultDetail.vue';
import Constants from '../components/utilities/Constants.vue';
import RemingtonGailText from './fonttype/RemingtonGailText.vue';
export default {
  // props: ['correctText'],
  components: { TestSeriesResultDetail, RemingtonGailText },
  mixins: [Constants],

  data() {
    return {
      selectedLanguage: "english",
      // correctText: "Type this correctly in the selected font.", // Default English text
      correctText: '',
      headText: 'Type this correctly in the selected font.',
      userInput: '',
      correctWordsCount: 0,
      totalWordsCount: 0,
      comparisonResult: [],
      fonts: {
        english: "Arial, sans-serif",
        hindi: "'Noto Sans Devanagari', serif"
      },
      timer: 0,
      timerStarted: false,
      showSavebtn: true,
      resultid: 0,
      selectedFont: '',
      initiateFonttype: { id: 0, name: 'English', font: 'Arial, sans-serif' }
    };
  },
  computed: {
    ...mapGetters(['loggedinuser', 'examDetails']),
    // selectedFont() {
    //   let font = this.FONT_TYPES.find(o=>o.id== this.examDetails?.examContent?.fonttype)
    //   console.log("font ",font)
    //   return font.name || "Arial, sans-serif";
    // },
    formattedTimer() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    typedWordsCount() {
      console.log("input ",this.userInput)
      if (this.userInput == '') {
        return 0;
      } else {
        return this.userInput?.trim().split(/\s+/).length;
      }
    },
    typedCharactersCount() {
      return this.userInput?.length;
    }
  },
  created() {
    this.timer = this.examDetails?.examContent?.timer;

  },
  mounted() {
    this.correctText = this.examDetails?.examContent?.answer
    this.initialize()
  },
  methods: {
    updateUserInput(newInput) {
      this.userInput = newInput;  // This will update the input value from the child
      console.log("Updating the input")
      console.log(newInput)
    },
    initialize(){
      this.initiateFonttype = this.FONT_TYPES.find(o => o.id == this.examDetails?.examContent?.fonttype)
      this.selectedFont = this.initiateFonttype?.font || "Arial, sans-serif"
    },
    startTimerIfNotStarted() {
      if (!this.timerStarted) {
        this.timerStarted = true;
        this.timer = this.examDetails?.examContent?.timer;
        this.startCountdown();
      }
    },
    startCountdown() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer--;
          this.startCountdown();
        }, 1000); // 1 second interval
      } else {
        // Time's up! Perform any necessary actions here
        this.submitAnswer();
      }
    },

    checkText() {
      this.$store.commit('assignloadingstatus',1)
      // console.log("correct text ", this.correctText)
      this.comparisonResult = [];
      const correctChars = this.correctText.split("");
      const userChars = this.userInput.split("");

      correctChars.forEach((char, index) => {
        const isMismatch = char !== (userChars[index] || "");
        this.comparisonResult.push({
          character: char,
          isMismatch
        });
      });
      const correctWords = this.correctText.trim().split(/\s+/);
      const userWords = this.userInput.trim().split(/\s+/);

      this.totalWordsCount = correctWords.length;
      this.correctWordsCount = 0;

      // Compare words
      correctWords.forEach((word, index) => {
        if (word === (userWords[index] || "")) {
          this.correctWordsCount++;
        }
      });

      // setTimeout(() => {
      this.submitAnswer()
      // }, 2000)
      // this.submitAnswer();
    },
    submitAnswer() {

      let param = {
        productid: this.examDetails?.singleProductMapping?.productid ?? 0, testseriesid: this.examDetails?.examContent.id, userInput: this.userInput,
        transactiondate: new Date().toISOString().slice(0, 10), nooferror: parseInt(this.totalWordsCount - this.correctWordsCount),
        correctwords: this.correctWordsCount,
        totalwords: this.totalWordsCount, userid: this.loggedinuser?.id
      }
      // console.log("param ", param)
      axios.post('api/single/question/submit', param)
        .then(response => {
          if(response.data.examresult!=null){
            this.resultid = response.data.examresult.id
            this.showSavebtn = false;
          }
          this.$store.commit('assignloadingstatus',0)
          // setTimeout(() => {
          //   this.cancelTest()
          // }, 10000)
          // this.cancelTest()
          // this.$router.push({path: '/customer-purchase'})
        })
        .catch(error => console.log(error))

    },
    cancelTest() {
      this.$emit("backToProductPage");
    }

  },
  watch: {
    selectedLanguage(newLanguage) {
      // Set correct text based on selected language
      if (newLanguage === "hindi") {
        this.headText = "यह सही ढंग से टाइप करें।";
      } else {
        this.headText = "Type this correctly in the selected font.";
      }
      this.userInput = ""; // Clear user input when language changes
      this.comparisonResult = [];
    }
  }
};
</script>

<style scoped>
.typing-tutor {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

.correct-text {
  font-size: 1.2em;
  margin: 10px 0;
}

.textarea {
  width: 100%;
  font-size: 1em;
  margin-bottom: 10px;
}

button {
  margin: 10px;
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
}

.result-text {
  font-size: 1.2em;
  white-space: pre-wrap;
  /* Preserve spaces */
}

.mismatch {
  background-color: #ffcccc;
  color: #ff0000;
}

.match {
  background-color: #ccffcc;
  color: #009900;
}

.display_timer {
  background: #ff000038;
  color: red;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-select {
  user-select: none;
  /* Prevent text selection */
}

.no-paste {
  -webkit-user-select: none;
  /* Chrome/Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>