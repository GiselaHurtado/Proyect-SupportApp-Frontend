<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
     
     
    </h3>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

h1 {
  font-weight: 500;
  font-size: 3rem;
  position: relative;
  top: -10px;
  color: #8e44ad;
  font-family: 'Poppins', sans-serif;
}

h3 {
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
    font-family: 'Poppins', sans-serif;
  }
}
</style>
