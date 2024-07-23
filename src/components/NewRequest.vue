

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const requestForm = reactive({
  dateRequest: '',
  firstName: '',
  lastName: '',
  titleRequest: '',
  requestContent: ''
});

const titleOptions = [
  'First Interview',
  'Treatment',
  'Anxiety',
  'Stress',
  'Others'
];

const submitForm = async () => {
  const url = 'http://localhost:8080/api/v1/requests';
  const data = {
    titleRequest: requestForm.titleRequest,
    requestContent: requestForm.requestContent,
    firstName: requestForm.firstName,
    lastName: requestForm.lastName,
    dateRequest: requestForm.dateRequest
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      alert('Request created successfully');
      router.push('/request');
    }
  } catch (error) {
    alert(`Fetch error: ${error}`);
  }
};
</script>

<template>
  <div class="container rounded shadow-sm">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-6 col-12 mb-4">
          <div class="form-control d-flex flex-column">
            <p class="h-blue">Request Date:</p>
            <input class="inputbox textmuted" type="date" v-model="requestForm.dateRequest">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-12 mb-4">
          <div class="form-control d-flex flex-column">
            <p class="h-blue">Applicant's Name:</p>
            <input class="inputbox" placeholder="First Name" type="text" v-model="requestForm.firstName">
          </div>
        </div>
        <div class="col-md-6 col-12 mb-4">
          <div class="form-control d-flex flex-column">
            <p class="h-blue">Last Name:</p>
            <input class="inputbox" placeholder="Surname" type="text" v-model="requestForm.lastName">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mb-4">
          <div class="form-control d-flex flex-column">
            <p class="h-blue">Title of The Request:</p>
            <select class="inputbox" v-model="requestForm.titleRequest">
              <option v-for="option in titleOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12 mb-4">
          <div class="form-control d-flex flex-column">
            <p class="h-blue">Request:</p>
            <textarea class="inputbox" placeholder="Write your request here" maxlength="2000" v-model="requestForm.requestContent"></textarea>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary form-control text-center">Submit</button>
    </form>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

body {
    margin-top: 5%;
    background: #ecf0f3;
    font-family: 'Poppins', sans-serif;
}

.container {
    margin-top: 5%;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    padding: 40px 30px 30px 30px;
    font-family: 'Poppins', sans-serif;
}

.radio-btn label {
    color: #555;
}

.inputbox {
    background: none;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
    border-radius: 20px;
    width: 100%;
    font-family: 'Poppins', sans-serif;
}

.form-control {
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    font-family: 'Poppins', sans-serif;
}

.btn-primary {
    background-color:#8e44ad;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
    font-family: 'Poppins', sans-serif;
}

.btn-primary:hover {
    background-color:  #8e44ad;
    font-family: 'Poppins', sans-serif;
}

@media(max-width: 380px) {
    .container {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>
