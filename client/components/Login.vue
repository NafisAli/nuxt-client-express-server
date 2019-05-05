<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
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
      <v-form>
        <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="email"></v-text-field>
        <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat small nuxt to="/register">Register</v-btn>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch("user/login", {
          email: this.email,
          password: this.password
        });

        this.email = "";
        this.password = "";

        this.$router.push({
          path: "/overview"
        });
      } catch (e) {
        //this.formError = e.message;
      }
    }
  },
  created: () => {
    // if (this.$store.state.user.authUser) {
    //   this.$router.push({
    //     path: "/overview"
    //   });
    // }
  }
};
</script>

<style>
</style>
