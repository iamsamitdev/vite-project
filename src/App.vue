<template>
  <router-view />
</template>

<script>
  let brand = " | ระบบร้องเรียนออนไลน์"

  export default {
    name : "App",

    watch: {
      $route(to) {
        document.title = to.meta.title + brand
      }
    }

  }
</script>