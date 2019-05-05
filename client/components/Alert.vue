<template>
  <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
    {{ text }}
    <v-btn dark flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    color: "cyan darken-2fo",
    text: "Default",
    timeout: 5000
  })
};
</script>

<style>
</style>
