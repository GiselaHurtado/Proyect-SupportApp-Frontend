<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NewRequest from './components/NewRequest.vue';
import RequestList from './components/RequestList.vue';
import RequestEdit from './components/RequestEdit.vue';

</script>

<template>
  <header>
    

    <div class="wrapper">
      <HelloWorld msg="Psychological Treatment" />
      <h2>Book your appointment</h2>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/newRequest">New Request</RouterLink>
        <RouterLink to="/requestList">Request List</RouterLink>
        <RouterLink to="/requestEdit">Request Edit</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 2;
  max-height: 100vh;
  font-family: 'Poppins', sans-serif;
  
}
h2{
  color:#8e44ad;
  text-align: center;
  font-size: medium;
}

/* .logo {
  display: block;
  margin: 0 auto 2rem;
} */

nav {
  width: 100%;
  font-size: 15px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  color: #666;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: #8e44ad;
}

nav a:first-of-type {
  border: 0;
  color: #8e44ad;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
