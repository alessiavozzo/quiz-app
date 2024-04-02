<script>
import { state } from "../assets/js/state.js";
export default {
    name: "AppResults",
    props: ["counter", "wrongAnswers"],
    data() {
        return {
            state: state
        }
    }
}
</script>

<template>

    <!-- score -->
    <div class="score">Your score is: {{ counter }}</div>
    <!-- wrong -->
    <div v-for="wrongAnswer in wrongAnswers">{{ state.replaceSpecialCharacters(wrongAnswer.question) }}
        <div class="options" v-for="(option, optionIndex) in wrongAnswer.options"
            :class="{ 'green': optionIndex === wrongAnswer.correctAnswer, 'red': optionIndex === wrongAnswer.userAnswerIndex }">
            {{ state.replaceSpecialCharacters(option) }}</div>
    </div>

</template>




<style scoped>
.red {
    background-color: red
}

.green {
    background-color: green;
}
</style>