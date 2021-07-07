<template>
  <div class="row login-container">
    <div class="col-md-7 mt-5">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h1>Login</h1>
            <p class="text-muted">login here</p>
            <form
              id="login-form"
              role="form"
              style="display: block"
              @submit.prevent="onSubmit"
            >
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Phone Number"
                  v-model="email"
                  required
                />
              </div>
              <!-- <div class="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                  required
                />
              </div> -->

              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-success"
                  style="width: 100%"
                  :disabled="isLoading"
                >
                  <i v-if="isLoading" class="fa fa-spinner fa-spin" />
                  Log in
                </button>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="text-center">
                      Belum punya akun? Daftar
                      <router-link to="/register">
                        <a>disini</a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-white bg-primary py-5 d-md-down-none">
          <div class="card-body text-center align-items-center d-flex">
            <div class style="width: 100%">
              <img :src="require('@/assets/images/logo.png')" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- <router-link to="/" class="btn btn-home"> Home </router-link> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import auth from "@/controller/auth.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["addMessage", "clearMessage", "loginWithEmail"]),
    onSubmit() {
      this.isLoading = true;
      let data = {
        phone: this.email,
        // password: this.password,
      };
      auth.login(data, this.$store, this.$router);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  justify-content: center;
}

.btn-home {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
}
</style>

