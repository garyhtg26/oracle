<template>
  <div class="row login-container">
    <div class="col-md-8 mt-5">
      <div class="card-group">
        <div class="card p-4" v-if="!isVerification">
          <div class="card-body">
            <h1>Register</h1>
            <p class="text-muted">register here</p>
            <form id="register-form" role="form" @submit.prevent="onSubmit">
              <div class="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  value
                  v-model="name"
                  required
                />
              </div>

              <div class="form-group">
                <label>Nomor HP</label>
                <input
                  type="number"
                  name="no"
                  id="no"
                  class="form-control"
                  value
                  v-model="phone"
                  required
                />
              </div>
              <!-- <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
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
                  Register
                </button>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="text-center">
                      Sudah punya akun? Login
                      <router-link to="/login">
                        <a>disini</a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card p-4" v-else>
          <div class="card-body">
            <div class="form-group">
              <label>Kode OTP</label>
              <input
                type="text"
                name="password"
                id="password"
                class="form-control"
                v-model="otp"
                v-on:keyup.enter="verify"
                required
              />
              <small>Tekan enter untuk mengirim kode otp</small>
            </div>
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import auth from "@/controller/auth.js";
export default {
  data() {
    return {
      name: "",
      phone: "",
      otp: null,
      isLoading: false,
      isVerification: false,
    };
  },
  methods: {
    ...mapActions(["clearMessage", "addMessage", "registerByEmail"]),
    onSubmit() {
      this.isLoading = true;
      let data = {
        phone: this.phone,
        name: this.name,
      };
      auth
        .register(data, this.$store, this.$router)
        .then(() => {
          this.isVerification = true;
          this.$message({
            type: "success",
            message:
              "Kami telah mengirimkan kode OTP ke nomor Kamu, silakan di cek",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "Data yang kamu masukkan masih ada yang salah :(",
          });
        });
    },
    verify() {
      const data = {
        phone: this.phone,
        otp: this.otp,
      };
      auth.verification(data, this.$store, this.$router);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  justify-content: center;
  align-self: center;
  display: flex;
  max-width: 100%;
  height: 100%;
}

.btn-home {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
}
</style>