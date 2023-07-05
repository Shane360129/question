<script>
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';

export default {
    setup() {
        const route = useRoute();
        const titleId = route.query.titleId;
        const userData = reactive({
            userName: '',
            userAge: '',
            userEmail: '',
            userPhone: '',
        });
        

        const titleQuestion = reactive({});
        const subTitleQuestions = reactive([]);
        const answerTypes = reactive([]);
        const userAnswers = reactive({});
        const confirmationPage = ref(false);
        const requestData = {
            titleId: titleId
        };

        const toggleOption = (subtitleId, optionContent) => {
            if (!userAnswers[subtitleId]) {
                userAnswers[subtitleId] = [];
            }

            const index = userAnswers[subtitleId].indexOf(optionContent);
            if (index > -1) {
                userAnswers[subtitleId].splice(index, 1);
            } else {
                userAnswers[subtitleId].push(optionContent);
            }
        };


        const fetchAnswerTypes = () => {
            const requestData = {
                titleId: titleId
            };
            fetch('http://localhost:8080/getAllQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.answerType);
                    console.log(data.message);
                    if (data.message === '查詢成功') {
                        answerTypes.splice(0);
                        answerTypes.push(...data.answerType);
                        console.log(answerTypes)
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchAnswerTypes();

        fetch('http://localhost:8080/findTitle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.titleQuestion.title)
                if (data.message === '查詢成功') {
                    titleQuestion.title = data.titleQuestion.title;
                    titleQuestion.directions = data.titleQuestion.directions;
                }
            })
            .catch(error => {
                console.error(error);
            });

        fetch('http://localhost:8080/findSubTitleQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.subTitleQuestionList)
                if (data.message === '查詢成功') {
                    subTitleQuestions.splice(0);
                    subTitleQuestions.push(...data.subTitleQuestionList);
                    console.log(subTitleQuestions)
                }
            })
            .catch(error => {
                console.error(error);
            });

        const submitForm = () => {
            fetch('http://localhost:8080/addUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                        return fetch('http://localhost:8080/saveUserAnswerData', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(userAnswers),
                        });
                    });
                    console.log(userAnswers)    
                    Promise.all(requests)
                        .then(() => {
                            confirmationPage.value = true;
                        })
                        .catch(error => {
                            console.error(error);
                        })
                .catch(error => {
                    console.error(error);
                });
        };
        return {
            userData,
            titleQuestion,
            subTitleQuestions,
            userAnswers,
            confirmationPage,
            submitForm,
            titleId,
            answerTypes,
            fetchAnswerTypes,
        };
    },
    methods: {
        submitForm() {
            // Retrieve user answers
            const userAnswersData = [];
            for (const subtitleId in this.userAnswers) {
                const answerContent = this.userAnswers[data.subTitleQuestionList.subtitleId];
                userAnswersData.push({
                    subtitleId,
                    answerContent
                });
            }
            // Do something with userAnswersData
            console.log(userAnswersData);
            // Make API call to save user answer data
            const userData = {
                userName: this.userData.userName,
                userAge: this.userData.userAge,
                userEmail: this.userData.userEmail,
                userPhone: this.userData.userPhone,
                userAnswerData: userAnswersData
            };
            saveUserAnswerData(userData)
                .then((response) => {
                    // Handle response from API
                    console.log(response);
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                });
            // Show confirmation page
            this.confirmationPage = true;
        },
    },
};
</script>

<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="userName">Name:</label>
                <input type="text" id="userName" v-model="userData.userName" required>
            </div>
            <div class="form-group">
                <label for="userAge">Age:</label>
                <input type="number" id="userAge" v-model="userData.userAge" required>
            </div>
            <div class="form-group">
                <label for="userEmail">E-Mail:</label>
                <input type="email" id="userEmail" v-model="userData.userEmail" required>
            </div>
            <div class="form-group">
                <label for="userPhone">Phonenumber:</label>
                <input type="tel" id="userPhone" v-model="userData.userPhone" required>
            </div>
            <hr>
            <div>
                <strong>Questionnaire:</strong> {{ titleQuestion.title }}
            </div>
            <div>
                <strong>Describe:</strong> {{ titleQuestion.directions }}
            </div>
            <hr>
            <div v-for="subTitle in subTitleQuestions" :key="subTitle.subtitleId">
                <strong>{{ subTitle.subTitleQuestion }}</strong>
                <template v-for="answerTypes in answerTypes">
                    <template v-if="answerTypes.subtitleId === subTitle.subtitleId">
                        <template v-if="answerTypes.answerOption === '1'">
                            <input type="text" v-model="userAnswers[subTitle.subtitleId]" :required="subTitle.mustFill">
                        </template>
                        <template v-if="answerTypes.answerOption === '2'">
                            <div>
                                <label>
                                    <input type="radio" :id="answerTypes.optionContent" :value="answerTypes.optionContent"
                                        v-model="userAnswers[subTitle.subtitleId]" :required="subTitle.mustFill">
                                    {{ answerTypes.optionContent }}
                                </label>
                            </div>
                        </template>
                        <template v-if="answerTypes.answerOption === '3'">
                            <div>
                                <input type="checkbox" :id="answerTypes.optionContent" :value="answerTypes.optionContent"
                                    >
                                <label>{{ answerTypes.optionContent }}</label>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
            <button type="submit">Send</button>
        </form>
    </div>
</template>
  
<style>
.form-group {
    margin-bottom: 1rem;
}
</style>
  