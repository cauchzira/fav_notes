<template>
  <nav class="navigate">
    <router-link to="/">Main</router-link>
    <router-link to="/favourite">Favourites</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style>
body {
  background: #b0c5a4;

  font-family: 'Josefin Sans', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.navigate {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  text-decoration: none;
}
</style>
<script setup lang="ts"></script>
