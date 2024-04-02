<script>
import { state } from "../assets/js/state.js";

export default {
    name: "AppMain",
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
                this.currentQuiz++;
                this.noPickedOption = false;
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
            <div class="quiz" v-for="(quiz, quizIndex) in state.quizs">
                <!-- question -->
                <div class="question" v-if="currentQuiz === quizIndex">{{
            quiz.question.replace(/&amp;quot;/g,
                '"').replace(/&amp;#039;/g, "'") }}
                </div>
                <!-- options list -->
                <div class="options" v-if="currentQuiz === quizIndex">
                    <!-- single answer: each loop returns the answer with its radiobox -->
                    <div class="answer" v-for="(option, optIndex) in state.options[quizIndex].shuffledAnswers">
                        <input type="radio" :id="`answer ${optIndex}`" :name="quizIndex" :value="optIndex"
                            @click="isAnswerCorrect(optIndex, quizIndex)">
                        <label :for="`answer ${optIndex}`">{{ option.replace(/&amp;quot;/g,
            '"').replace(/&amp;#039;/g, "'")
                            }}</label>
                    </div>
                </div>

            </div>
            <!-- warning if you don't pick an option -->
            <div v-if="noPickedOption === true" class="pick-option">You have to pick an option</div>
            <!-- next question button -->
            <button @click="nextQuiz(userAnswerIndex)">Next</button>
        </div>

        <!-- Final score + wrong answers-->
        <div class="result-container" v-if="currentQuiz === state.quizs.length">
            <!-- score -->
            <div class="score">Your score is: {{ counter }}</div>
            <!-- wrong -->
            <div v-for="wrongAnswer in wrongAnswers">{{ wrongAnswer.question.replace(/&amp;quot;/g,
            '"').replace(/&amp;#039;/g, "'") }}
                <div class="options" v-for="(option, optionIndex) in wrongAnswer.options"
                    :class="{ 'green': optionIndex === wrongAnswer.correctAnswer, 'red': optionIndex === wrongAnswer.userAnswerIndex }">
                    {{ option.replace(/&amp;quot;/g,
            '"').replace(/&amp;#039;/g, "'") }}</div>
            </div>
            <!-- restart -->
            <button @click="reloadPage()">Try again</button>
        </div>


    </main>

</template>


<style scoped>
.red {
    background-color: red
}

.green {
    background-color: green;
}
</style>