<template>
    <div>
        <div class="col-md-12">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <!-- Statistics Table -->
                        <table class="table table-bordered table-responsive">
                            <thead class="p-3 mb-2 bg-dark text-white">
                                <tr>
                                    <th scope="col" style="width: 50%">Description</th>
                                    <th scope="col" style="width: 50%">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Words</td>
                                    <td>{{ results?.totalwords || 0 }}</td>
                                </tr>
                                <tr>
                                    <td>Correct Words</td>
                                    <td>{{ results?.correctwords || 0 }}</td>
                                </tr>
                                <tr>
                                    <td>Incorrect Words</td>
                                    <td>{{ results?.incorrectwords || 0 }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Comparison Table -->
                        <table class="table table-bordered table-responsive">
                            <thead class="p-3 mb-2 bg-dark text-white">
                                <tr>
                                    <th scope="col" style="width: 50%">Question Paragraph</th>
                                    <th scope="col" style="width: 50%">Your Response with Evaluation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p class="result-text" :style="{ fontFamily: selectedFont }">
                                            {{ results?.testseries?.answer || "No Answer Provided" }}
                                        </p>
                                    </td>

                                    
                                    <td>
                                        <p v-html="highlightedDiff" :style="{ fontFamily: selectedFont }"></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-sm-1"></div>
                </div>

                <!-- Back Button -->
                <div class="text-center mt-10">
                    <button type="button" class="btn btn-primary" @click="backToDashboard">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Constants from "../../components/utilities/Constants.vue";
import { diffWords } from "diff"; // Import jsdiff for word comparison

export default {
    props: ["resultid"],
    mixins: [Constants],
    data() {
        return {
            results: {}, // Results fetched from API
            selectedFont: null, // Selected font style
            highlightedDiff: "", // HTML string with word differences
        };
    },
    mounted() {
        this.fetchResults();
    },
    methods: {
        initializeComparison() {
            const correctAnswer = this.results?.testseries?.answer || "";
            const userInput = this.results?.userInput || "";

            // Use jsdiff to compare words
            const diff = diffWords(correctAnswer, userInput);

            let totalWords = 0;
            let incorrectWords = 0;
            console.log(correctAnswer)
            console.log(userInput)
            console.log(diff)
            // Build the HTML for highlighting differences
            const diffHtml = diff.map(part => {
                
                totalWords += part.value.trim().split(/\s+/).length; // Count total words
                if (part.added || part.removed) {
                    incorrectWords += part.value.trim().split(/\s+/u).length; // Count incorrect words
                }

                if (part.removed) {
                    return `<span class="mismatch" style="font-Family: ${this.selectedFont} ">${part.value}</span>`; // Highlight incorrect (missing)
                } else if (part.added) {
                    return `<span class="extra" style="font-Family: ${this.selectedFont} ">${part.value}</span>`; // Highlight extra words
                } else {
                    return `<span class="match" style="font-Family: ${this.selectedFont} ">${part.value}</span>`; // Correct words
                }
            }).join(" ");
            console.log(diffHtml)
            this.highlightedDiff = diffHtml;

            // Calculate statistics
            this.results.totalwords = totalWords;
            this.results.incorrectwords = incorrectWords;
            this.results.correctwords = totalWords - incorrectWords;
        },
        fetchResults() {
            const param = { id: this.resultid };

            axios
                .post("api/test/series/result", param)
                .then(response => {
                    const examResults = response.data.examresult || [];
                    if (examResults.length > 0) {
                        this.results = examResults[0];
                        let fontNumber = this.results?.testseries.fonttype;
                        this.initiateFonttype = this.FONT_TYPES.find(o => o.id == fontNumber);
                        this.selectedFont = this.initiateFonttype?.font || "Arial, sans-serif";
                        this.initializeComparison();
                    }
                })
                .catch(error => {
                    console.error("Error fetching results:", error);
                });
        },
        backToDashboard() {
            this.$emit("returndashboard");
        },
    },
};
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
}

th {
    background-color: #1d1b31;
    color: #fff;
}

.result-text {
    font-size: 1.2em;
    white-space: pre-wrap;
}

.mismatch {
    background-color: #ffcccc !important;
    color: #ff0000;
    font-size: 16px;
    margin-right: 5px;
    padding: 2px 5px;
    border-radius: 3px;
}

.extra {
    background-color: #fffdcc;
    color: #d89e00;
    font-size: 16px;
    margin-right: 5px;
    padding: 2px 5px;
    border-radius: 3px;
}

.match {
    background-color: #ccffcc;
    color: #009900;
    font-size: 16px;
    margin-right: 5px;
    padding: 2px 5px;
    border-radius: 3px;
}
</style>
