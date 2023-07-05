<script>
export default {
  data() {
    return {
      titleQuestions: []
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
    }
  }
}
</script>

<template>
  <div>
    <RouterLink :to="'/addQuestion'"><button type="button" class="btn btn-light">Add</button></RouterLink>
    <RouterLink :to="'/deleteQuestion'"><button type="button" class="btn btn-light">Delete</button></RouterLink>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Directions</th>
          <th scope="col">CreateTime</th>
          <th scope="col">StartTime</th>
          <th scope="col">UpdateTime</th>
          <th scope="col">EndTime</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in titleQuestions" :key="question.titleId">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <RouterLink :to="`/question/${question.titleId}`" class="question-link">{{ question.title }}</RouterLink>
          </td>
          <td>{{ question.directions }}</td>
          <td>{{ question.createTime }}</td>
          <td>{{ question.startTime }}</td>
          <td>{{ question.updateTime }}</td>
          <td>{{ question.endTime }}</td>
          <td>{{ question.status ? '開放填寫' : '未開放填寫' }}</td>
        </tr>
      </tbody>
    </table>    
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
  flex-basis: 50%; /* Adjust the value based on the desired number of columns */
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
