<script>
import { state } from "../assets/js/state.js";
export default {
    name: "AppQuiz",
    props: ["quiz", "quizIndex", "currentQuiz"],
    data() {
        return {
            state: state
        }
    }
}
</script>

<template>

    <div class="quiz">
        <!-- question -->
        <div class="question" v-if="currentQuiz === quizIndex">{{ state.replaceSpecialCharacters(quiz.question) }}
        </div>
        <!-- options list -->
        <div class="options" v-if="currentQuiz === quizIndex">
            <!-- single answer: each loop returns the answer with its radiobox -->
            <div class="answer" v-for="(option, optIndex) in state.options[quizIndex].shuffledAnswers">
                <input type="radio" :id="`answer ${optIndex}`" :name="quizIndex" :value="optIndex"
                    @click="$emit('checkCorrect', optIndex, quizIndex)">
                <label :for="`answer ${optIndex}`">{{ state.replaceSpecialCharacters(option) }}</label>
            </div>
        </div>

    </div>
</template>



<style scoped></style>