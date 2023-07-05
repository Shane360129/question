<script>
import BackBarView from "../views/BackBar.vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    BackBarView
  },
  setup() {
    const title = ref('');
    const directions = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const status = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const defaultEndTime = computed(() => {
      if (startTime.value) {
        const startDate = new Date(startTime.value);
        const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        endTime.value = endDate.toISOString().slice(0, 10);
        return endDate.toISOString().slice(0, 10);
      }
      return '';
    });

    const addTitleQuestion = () => {
      const requestData = {
        title: title.value,
        directions: directions.value,
        startTime: startTime.value,
        endTime: endTime.value,
        status: status.value
      };

      // Store data in localStorage
      localStorage.setItem('titleQuestionData', JSON.stringify(requestData));

      // Clear form data
      title.value = '';
      directions.value = '';
      startTime.value = '';
      endTime.value = '';
      status.value = false;
      errorMessage.value = '';

      // Display success message
      alert('Save Title Question Success');

      // Redirect to another page
      router.push('/addSubTitleQuestion').catch(err => console.error(err));
    };

    const updateEndTime = event => {
      endTime.value = event.target.value;
    };

    return {
      title,
      directions,
      startTime,
      endTime,
      status,
      errorMessage,
      defaultEndTime,
      addTitleQuestion,
      updateEndTime
    };
  }
};
</script>

<template>
  <BackBarView />
  <div>
    <h2>Add Title Question</h2>
    <form @submit.prevent="addTitleQuestion">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="title">Title:</span>
        <input type="text" class="form-control" v-model="title" aria-label="Title" aria-describedby="title" required>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="directions">Directions:</span>
        <textarea class="form-control" v-model="directions" aria-label="Directions" aria-describedby="directions" required></textarea>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="startTime">StartTime:</span>
        <input type="date" class="form-control" v-model="startTime" aria-label="Start Time" aria-describedby="startTime" required>
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="endTime">EndTime:</span>
        <input type="date" class="form-control" :value="defaultEndTime" @input="updateEndTime" aria-label="End Time" aria-describedby="endTime" required>
      </div>

      <div class="input-group input-group-sm mb-3">
        <div class="input-group-text">
          <input class="form-check-input mt-0" type="checkbox" id="status" v-model="status">
          <label class="form-check-label" for="status">Status:</label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Next</button>

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
