<script>
export default {
    data() {
        return {
            titleQuestions: 
            [
            ]
        };
    },
    mounted() {
        this.fetchAllQuestions();
    },
    methods: {
        fetchAllQuestions() {
            fetch('http://localhost:8080/findAllQuestion')
                .then(response => response.json())
                .then(data => {
                    this.titleQuestions = data.titleQuestionList;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteSelectedQuestions() {
            const selectedQuestions = this.titleQuestions.filter(question => question.selected);
            const questionIds = selectedQuestions.map(question => question.titleId);
            

            fetch('http://localhost:8080/deleteQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titleId: questionIds
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert(data.message)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Directions</th>
                    <th scope="col">Create Time</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">Update Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in titleQuestions" :key="question.titleId">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <RouterLink :to="`/question/${question.titleId}`" class="question-link">{{ question.title }}
                        </RouterLink>
                    </td>
                    <td>{{ question.directions }}</td>
                    <td>{{ question.createTime }}</td>
                    <td>{{ question.startTime }}</td>
                    <td>{{ question.updateTime }}</td>
                    <td>{{ question.endTime }}</td>
                    <td>{{ question.status ? 'open' : 'close' }}</td>
                    <td><input type="checkbox" v-model="question.selected" v-if="question.status"></td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-light" @click="deleteSelectedQuestions">Delete</button>
    </div>
</template>

<style>
.question-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.question-item {
    flex-basis: 50%;
    /* Adjust the value based on the desired number of columns */
}

.question-link {
    text-decoration: none;
    color: rgb(32, 150, 214);
    transition: 0.4s;
}

.question-link:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
}
</style>