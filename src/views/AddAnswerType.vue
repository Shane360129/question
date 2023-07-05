<script>
import { ref } from 'vue';
import BackBarView from "../views/BackBar.vue";

export default {
  components: {
    BackBarView
  },
  setup() {
    const answerOption = ref('');
    const optionContent = ref('');
    const subtitleId = ref('');
    const errorMessage = ref('');

    const addAnswerType = () => {
      // Construct request data
      const requestData = {
        answerOption: answerOption.value,
        optionContent: optionContent.value,
        subtitleId: subtitleId.value
      };

      // Send POST request to the backend
      fetch('http://localhost:8080/addAnswerType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 'SUCCESS') {
            // Clear form data
            answerOption.value = '';
            optionContent.value = '';
            subtitleId.value = '';
            errorMessage.value = '';

            // Display success message
            alert(data.message);
          } else {
            // Display error message
            errorMessage.value = data.message;
          }
        })
        .catch(error => {
          console.error(error);
          errorMessage.value = 'An error occurred during the request.';
        });
    };

    return {
      answerOption,
      optionContent,
      subtitleId,
      errorMessage,
      addAnswerType
    };
  }
};
</script>

<template>
  <BackBarView />
  <div>
    <h2>Add Answer Type</h2>
    <form @submit.prevent="addAnswerType">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="answerOption">Answer Option:</span>
        <select class="form-select" v-model="answerOption" aria-label="Answer Option" aria-describedby="answerOption" required>
          <option value="" disabled>Select an option</option>
          <option value="single">單選</option>
          <option value="multiple">多選</option>
          <option value="text">文字</option>
        </select>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="optionContent">Option Content:</span>
        <textarea class="form-control" v-model="optionContent" aria-label="Option Content" aria-describedby="optionContent" required></textarea>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="subtitleId">Subtitle ID:</span>
        <input type="text" class="form-control" v-model="subtitleId" aria-label="Subtitle ID" aria-describedby="subtitleId" required>
      </div>

      <button type="submit" class="btn btn-primary">Add Answer Type</button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
    <form @submit.prevent="addAnswerType">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="answerOption">Answer Option:</span>
        <input type="text" class="form-control" v-model="answerOption" aria-label="Answer Option" aria-describedby="answerOption" required>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="optionContent">Option Content:</span>
        <textarea class="form-control" v-model="optionContent" aria-label="Option Content" aria-describedby="optionContent" required></textarea>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="subtitleId">Subtitle ID:</span>
        <input type="text" class="form-control" v-model="subtitleId" aria-label="Subtitle ID" aria-describedby="subtitleId" required>
      </div>

      <button type="submit" class="btn btn-primary">Add Answer Type</button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>


<style>
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
