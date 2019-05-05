<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Registration</v-toolbar-title>
      <!-- <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn :href="source" icon large target="_blank" v-on="on">
                <v-icon large>code</v-icon>
              </v-btn>
            </template>
            <span>Source</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                href="https://codepen.io/johnjleider/pen/wyYVVj"
                target="_blank"
                v-on="on"
              >
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span>Codepen</span>
      </v-tooltip>-->
    </v-toolbar>
    <v-card-text>
      <v-form lazy-validation ref="regForm">
        <v-text-field name="firstName" label="First Name" type="text" v-model="firstName" required :rules="validationRules.name"></v-text-field>
        <v-text-field name="lastName" label="Last Name" type="text" v-model="lastName" required :rules="validationRules.name"></v-text-field>
        <v-text-field name="email" label="Email" type="email" v-model="email" required :rules="validationRules.email"></v-text-field>
        <v-text-field id="password" name="password" label="Password" type="password" v-model="password" required :rules="validationRules.password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn flat small color="primary" nuxt to="/">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat small color="error" @click="resetForm">Reset</v-btn>
      <v-btn color="primary">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    validationRules: {
      name: [
        v => !!v || "Required",
        v =>
          /^[a-zA-Z. ]+$/.test(v) ||
          "Name cannot contain numbers or special charachters."
      ],
      email: [
        v => !!v || "Required",
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid email format"
      ],
      password: [
        v => !!v || "Required",
        v => v.length >= 8 || "Password must be at least 8 characters long",
        v =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase character",
        v =>
          /[a-z]/.test(v) ||
          "Password must contain at least one lowercase character",
        v =>
          /\d/.test(v) || "Password must contain at least one numeric character"
      ]
    }
  }),

  methods: {
    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";

      this.$refs.regForm.resetValidation();
    },
    register() {}
  }
};
</script>

<style>
</style>
