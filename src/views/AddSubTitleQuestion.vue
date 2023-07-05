

<script>
import BackBarView from "../views/BackBar.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    BackBarView
  },
  setup() {
    const subTitleQuestion = ref('');
    const mustFill = ref(false);
    const dynamicFields = ref([]);
    const answerOption = ref('');
    const optionContent = ref('');
    const subtitleId = ref('');
    const submittedQuestions = ref([]);
    const editingIndex = ref(-1);
    // 新增 editingIndex 變量
    const subtitleList = ref({
      subTitleQuestionList: []
    });
    const answerType = ref({
      answerTypeList: []
    });



    const addQuestionAndAnswer = () => {
      const questionData = {

        subTitleQuestion: subTitleQuestion.value,
        mustFill: mustFill.value,
        answerOption: answerOption.value,
        optionContent: optionContent.value,
        fields: dynamicFields.value.map(field => ({
          label: field.label,
          value: field.value,
          required: field.required
        }))
      };

      submittedQuestions.value.push(questionData);  // 添加問題到 submittedQuestions 數組中
      clearFields();  // 清空輸入欄位
    };

    const clearFields = () => {
      subTitleQuestion.value = '';
      mustFill.value = false;
      answerOption.value = '';
      optionContent.value = '';
      dynamicFields.value = [];
      editingIndex.value = -1; // 清除編輯索引
    };


    const removeField = (index) => {
      submittedQuestions.value.splice(index, 1);
    };

    const editField = (index) => {
      const question = submittedQuestions.value[index];
      subTitleQuestion.value = question.subTitleQuestion;
      mustFill.value = question.mustFill;
      answerOption.value = question.answerOption;
      optionContent.value = question.optionContent;
      dynamicFields.value = question.fields.map(field => ({
        label: field.label,
        value: field.value,
        required: field.required
      }));
      editingIndex.value = index;
    };

    const saveField = (index) => {
      const question = submittedQuestions.value[index];
      question.subTitleQuestion = subTitleQuestion.value;
      question.mustFill = mustFill.value;
      question.answerOption = answerOption.value;
      question.optionContent = optionContent.value;
      question.fields = dynamicFields.value.map(field => ({
        label: field.label,
        value: field.value,
        required: field.required
      }));
      editingIndex.value = -1;
      clearFields();
    };
    const storedData = localStorage.getItem('titleQuestionData');
    const data = JSON.parse(storedData);


    const submitData = async () => {
      try {
        const titleData = {
          title: data.title,
          directions: data.directions,
          startTime: data.startTime,
          endTime: data.endTime,
          status: data.status
        };

        const titleResponse = await fetch('http://localhost:8080/addTitle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(titleData),
        });

        const titleResult = titleResponse.json();

        titleResult.then(result => {
          const titleId = result.titleId;
          subtitleList.value.subTitleQuestionList = submittedQuestions.value.map(field => ({
            titleId: titleId,
            subTitleQuestion: field.subTitleQuestion,
            mustFill: field.mustFill
          }))
          console.log(titleId); // 印出 titleId 的值
        });
        console.log(subtitleList.value);
        // localStorage.clear('titleQuestionData');

        const subTitleQuestionResponse = await fetch('http://localhost:8080/addSubTitleQuestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subtitleList.value),
        });
        const subTitleQuestionResult = await subTitleQuestionResponse.json();

        console.log(subTitleQuestionResult);

        const answerType = {
          answerOption: answerOption.value,
          optionContent: optionContent.value,
        };

        const answerTypeResponse = await fetch('http://localhost:8080/addAnswerType', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answerTypeData),
        });

        const answerTypeResult = await answerTypeResponse.json();
        console.log(answerTypeResult);

      } catch (error) {
        console.error(error);
      }
    };


    return {
      subTitleQuestion,
      mustFill,
      dynamicFields,
      answerOption,
      optionContent,
      subtitleId,
      submittedQuestions,
      addQuestionAndAnswer,
      removeField,
      submitData,
      editField,
      saveField,
      subtitleList,
      editingIndex // 將 editingIndex 返回
    };
  }
};
</script>

<template>
  <BackBarView />
  <div>
    <h2>Add Subtitle Question and Answer Type</h2>
    <form @submit.prevent="addQuestionAndAnswer">

      <!-- Sub Title Question input -->
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="subTitleQuestion">Subtitle Question:</span>
        <textarea id="subTitleQuestion" class="form-control" v-model="subTitleQuestion" required></textarea>
      </div>

      <!-- Must Fill checkbox -->
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="mustFill">Must Fill:</span>
        <input type="checkbox" id="mustFill" class="form-check-input" v-model="mustFill" />
      </div>

      <!-- Dynamic Fields -->
      <div v-for="(field, index) in dynamicFields" :key="index" class="input-group input-group-sm mb-3">
        <span class="input-group-text">{{ field.label }}:</span>
        <input type="text" class="form-control" v-model="field.value" :required="field.required">
      </div>

      <!-- Answer Option select -->
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="answerOption">Answer Option:</span>
        <select class="form-select" v-model="answerOption" aria-label="Answer Option" aria-describedby="answerOption"
          required>
          <option value="" disabled>Select an option</option>
          <option value="1">InputBox</option>
          <option value="2">Single-choice</option>
          <option value="3">Multiple-choice</option>
        </select>
      </div>

      <!-- Option Content textarea -->
      <div class="input-group input-group-sm mb-3" v-if="answerOption !== '1'">
        <span class="input-group-text" id="optionContent">Option Content:</span>
        <textarea class="form-control" v-model="optionContent" aria-label="Option Content"
          aria-describedby="optionContent" :required="answerOption !== '1'"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="addQuestionAndAnswer">Add Question and Answer</button>
    </form>

    <h3>Submitted Questions and Answer Types</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Sub Title Question</th>
          <th>Must Fill</th>
          <th>Answer Option</th>
          <th>Option Content</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(question, index) in submittedQuestions" :key="index"
          @click="selectQuestion(index, question.subTitleQuestion)">
          <td>{{ question.subTitleQuestion }}</td>
          <td>{{ question.mustFill }}</td>
          <td>{{ question.answerOption }}</td>
          <td>{{ question.optionContent }}</td>
          <button type="button" class="btn btn-danger" @click="removeField(index)">Remove</button>
          <button type="button" class="btn btn-primary" @click="editField(index)">Edit</button>
          <button type="button" class="btn btn-success" v-if="editingIndex === index"
            @click="saveField(index)">Save</button> <!-- 新增保存按鈕 -->
        </tr>
      </tbody>
    </table>
  </div>
  <button type="submit" class="btn btn-primary" @click="submitData">Add Question and Answer</button>
</template>

<style>
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
