import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
    quizs: [],
    options: [],
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle(array) {
        let shuffleAnswers = []
        for (let i = 0; i < array.length; i++) {
            let randomNumber = this.getRndInteger(0, 1);
            //se esce 0, metti l'elemento in posizione i all'inizio del nuovo array, se esce 1 alla fine
            if (randomNumber === 0) {
                shuffleAnswers.unshift(array[i]);
            }
            else {
                shuffleAnswers.push(array[i]);
            }
        }
        return shuffleAnswers
    },


    getQuizs() {
        axios
            .get("https://opentdb.com/api.php?amount=3&type=multiple")
            .then(response => {
                console.log(response.data.results);
                //riassegno a quizs l'array di quiz
                this.quizs = response.data.results;
                console.log(this.quizs);

                //mappa l'array quizs affinchè si crei un array options che mi deve restituire un oggetto
                this.options = this.quizs.map(quiz => {
                    //per ogni quiz presente in quiz, crea la costante answers che contiene sia la risposta esatta sia quelle sbagliate
                    let answers = [quiz.correct_answer, ...quiz.incorrect_answers];
                    //console.log(answers);
                    //console.log(answers.findIndex(answer => answer === quiz.correct_answer));

                    //console.log(answers);
                    //chiamo la funzione shuffle e do in ingresso l'array answers (risposte ordinate) e ricevo l'array di risposte mischiate => assegno a una variabile shuffledAnswers
                    let shuffledAnswers = this.shuffle(answers);
                    //console.log(shuffledAnswers);
                    //crea la costante correctAnswerIndex che mi restituisce l'index della risposta esatta: findIndex cicla in shuffledAnswers e, per ogni answer, mi restituisce l'indice dell'answer che corrisponde a quiz.correct_answer                    
                    let correctAnswerIndex = shuffledAnswers.findIndex(answer => answer === quiz.correct_answer);
                    //console.log(correctAnswerIndex);
                    return { shuffledAnswers, correctAnswerIndex }

                })
                console.log(this.options);
            })
    }
})