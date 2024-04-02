<script>
import { state } from "../assets/js/state.js";
import AppQuiz from "./AppQuiz.vue";
import AppResults from "./AppResults.vue";

export default {
    name: "AppMain",
    components: {
        AppQuiz,
        AppResults
    },
    data() {
        return {
            state: state,
            currentQuiz: 0,
            userAnswerIndex: null,
            counter: 0,
            noPickedOption: false,
            wrongAnswers: []
        }
    },
    methods: {
        //per barare e controllare le risposte
        isAnswerCorrect(optIndex, quizIndex) {
            console.log("risposta scelta", optIndex);
            this.userAnswerIndex = optIndex;
            if (optIndex !== null && optIndex === state.options[quizIndex].correctAnswerIndex) {
                console.log("giusto");
            }
            else {
                console.log("sbagliato");
            }
        },
        nextQuiz(userAnswerIndex) {
            //console.log(state.options[this.currentQuiz].correctAnswerIndex);
            //console.log(this.userAnswerIndex);
            if (userAnswerIndex === null) {
                console.log("rispondi");
                this.noPickedOption = true
            }
            else {
                this.checkCorrect(userAnswerIndex);
                this.currentQuiz++;
                this.noPickedOption = false;
                this.userAnswerIndex = null
            }
        },
        checkCorrect(userAnswerIndex) {
            if (userAnswerIndex !== null && userAnswerIndex === state.options[this.currentQuiz].correctAnswerIndex) {
                this.counter++
                console.log(this.counter);
            }
            else if (userAnswerIndex !== null && userAnswerIndex !== state.options[this.currentQuiz].correctAnswerIndex) {
                this.wrongAnswers.push(
                    {
                        question: state.quizs[this.currentQuiz].question,
                        options: state.options[this.currentQuiz].shuffledAnswers,
                        correctAnswer: state.options[this.currentQuiz].correctAnswerIndex,
                        userAnswerIndex: userAnswerIndex
                    },
                )
            }
        },
        reloadPage() {
            window.location.reload()
        }
    },
    created() {
        state.getQuizs();
    }
}
</script>

<template>
    <main>
        <div class="quiz-container" v-if="currentQuiz <= state.quizs.length - 1">

            <!-- quiz: each loop returns the quiz and its index -->
            <AppQuiz v-for="(quiz, quizIndex) in state.quizs" :quiz="quiz" :quizIndex="quizIndex"
                :currentQuiz="currentQuiz" @check-correct="isAnswerCorrect" />

            <!-- warning if you don't pick an option -->
            <div v-if="noPickedOption === true" class="pick-option">You have to pick an option</div>

            <!-- next question button -->
            <button @click="nextQuiz(userAnswerIndex)">Next</button>
        </div>

        <!-- Final score + wrong answers-->
        <div class="result-container" v-if="currentQuiz === state.quizs.length">

            <!-- renders final score + wrong answers -->
            <AppResults :counter="counter" :wrongAnswers="wrongAnswers" />

            <!-- restart -->
            <button @click="reloadPage()">Try again</button>
        </div>


    </main>

</template>


<style scoped></style>