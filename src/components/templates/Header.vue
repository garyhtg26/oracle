<template>
  <div>
    <scroll-fixed-header :fixed.sync="fixed" :threshold="56">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#" class="ml-3">
            <router-link to="/">
              <img
                :src="require('@/assets/images/logo-yellow.png')"
                alt="Yellowins"
                width="250px"
                style="padding: 20px"
              />
            </router-link>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <div class="search mr-4">
                <el-input
                  placeholder="Search"
                  v-model="search"
                  id="popover-1"
                  icon="el-icon-search"
                ></el-input>
                <i
                  class="fa fa-search"
                  style="color: #f9b410; padding: 10px"
                ></i>
                <b-popover
                  :target="`popover-1`"
                  triggers="click focus"
                  :placement="'bottom'"
                  title="Hasil Pencarian"
                  style="padding: 0px; width: 450px"
                >
                  <div style="max-height: 300px; overflow: auto">
                    <b-list-group style="padding: 0px; width: 200px !important">
                      <b-list-group-item
                        style="padding: 8px"
                        v-for="(x, index) in searchRes"
                        :key="index"
                        :to="'/product/' + x.name.replace(/\s/g, '+')"
                      >
                        {{ x.name }}
                      </b-list-group-item>
                    </b-list-group>
                  </div>
                </b-popover>
              </div>

              <b-nav-item to="/premium" class="mr-4">PREMIUM</b-nav-item>
              <b-nav-item to="/" class="mr-4">DOWNLOAD</b-nav-item>
              <b-nav-item
                v-if="!$store.state.user.name"
                v-b-modal.modal-login
                class="mr-5"
              >
                LOGIN
              </b-nav-item>

              <b-nav-item-dropdown class="mr-5" right v-else>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <strong>
                    {{ $store.state.user.category || $store.state.user.name }}
                  </strong>
                </template>
                <b-dropdown-text style="width: 300px">
                  <ul class="list-unstyled">
                    <b-media tag="li">
                      <template #aside>
                        <img
                          :src="require('@/assets/images/logo2.png')"
                          blank
                          blank-color="#abc"
                          width="50"
                          class="align-content-center"
                          alt="placeholder"
                        />
                      </template>
                      <h5 class="mt-0 mb-1">{{ $store.state.user.name }}</h5>
                      <div class="mb-0">
                        <div>{{ $store.state.user.email }}</div>
                        <strong>{{ $store.state.user.category }}</strong>
                      </div>
                    </b-media>
                  </ul>
                </b-dropdown-text>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item
                  class="justify-content-center my-auto"
                  @click="logoutUser"
                >
                  Sign Out
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </scroll-fixed-header>
    <!-- modal -->
    <b-modal id="modal-login" v-model="modalLog" title="Login" hide-footer>
      <div class="child">
        <b-tabs v-model="tab" content-class="mt-3" fill align="center">
          <b-tab active>
            <template #title>
              <h5 style="color: #f9b410">Login</h5>
            </template>
            <p>Selamat datang kembali</p>
            <p style="font-size: 12px" class="mx-5">
              Masukkan nomor telepon Anda dan kami akan mengirimkan kode
              verifikasi Anda
            </p>
            <div
              class="md-form"
              style="
                border-bottom: 1px solid white;
                margin-left: 120px;
                margin-right: 120px;
              "
            >
              <!-- <i>+62</i> -->
              <input
                v-model="forms.email"
                type="email"
                placeholder="Email"
                style="
                  outline: 0;
                  border-width: 0px;
                  color: white;
                  background: #232323;
                  margin-left: 1px;
                "
              />
            </div>
            <!--  -->
            <div
              class="md-form mt-3"
              style="
                border-bottom: 1px solid white;
                margin-left: 120px;
                margin-right: 120px;
              "
            >
              <!-- <i>+62</i> -->
              <input
                type="password"
                v-model="forms.password"
                placeholder="Password"
                style="
                  outline: 0;
                  border-width: 0px;
                  color: white;
                  background: #232323;
                  margin-left: 1px;
                "
              />
            </div>
          </b-tab>
          <b-tab>
            <template #title>
              <h5 style="color: #f9b410">Register</h5>
            </template>
            <div>
              <div
                class="md-form"
                style="
                  border-bottom: 1px solid white;
                  margin-left: 20px;
                  margin-right: 20px;
                "
              >
                <p>Selamat datang</p>
                <p style="font-size: 12px" class="mx-5">
                  Silahkan lengkapi data berikut untuk mendapatkan kode
                  verifikasi
                </p>
                <div>
                  <b-form-group
                    label="Nama:"
                    label-for="nested-street"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input
                      v-model="forms.name"
                      class="w-100"
                      id="nested-street"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Email:"
                    label-for="nested-city"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input
                      v-model="forms.email"
                      type="email"
                      id="nested-city"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Phone:"
                    label-for="nested-state"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input
                      v-model="forms.phone"
                      type="number"
                      id="nested-state"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Alamat:"
                    label-for="nested-country"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input
                      v-model="forms.address"
                      id="nested-country"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="password:"
                    label-for="nested-country"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input
                      type="password"
                      v-model="forms.password"
                      id="nested-country"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
        <b-button
          variant="light"
          @click="hideModal"
          style="width: 50%"
          class="mt-4 mb-2"
        >
          {{ tab == 0 ? "Kirim" : "Daftar" }}
        </b-button>
      </div>
    </b-modal>
    <b-modal
      v-model="modalVer"
      id="modal-verification"
      title="Verifikasi"
      hide-footer
    >
      <div class="child">
        <h5 style="color: #f9b410">Verification</h5>
        <p>Selamat datang kembali</p>
        <p style="font-size: 12px" class="mx-5">
          Enter your verification code below that we send to you. we send to
          your Email
          {{ inOtp }}
        </p>
        <div>
          <input
            type="text"
            maxlength="1"
            class="verif mx-2"
            v-for="x in 6"
            :key="x"
            v-model="otp[`f${x}`]"
            :placeholder="x"
          />
        </div>
        <b-button
          @click="verification"
          variant="light"
          style="width: 50%"
          class="mt-4 mb-2"
        >
          Login
        </b-button>
      </div>
    </b-modal>
    <b-modal
      id="modal-bank"
      v-model="$store.state.modalBank"
      title="BootstrapVue"
      hide-footer
    >
      <div class="child">
        <h5 style="color: #f9b410">Silahkan Pilih Bank</h5>

        <p style="font-size: 12px" class="mx-5">
          Kami akan memberi Anda instruksi tentang cara menyelesaikan transfer
          di ATM atau di aplikasi Mobile Banking
        </p>
        <div>
          <b-form-select
            style="width: 80%"
            v-model="selected.payment"
            :options="optPayments"
          ></b-form-select>
          <div class="mt-3" style="text-align-last: left">
            <tr>
              <td>Kode pembayaran</td>
              <td>: {{ payment.business_id }}</td>
            </tr>
            <tr>
              <td>Jumlah</td>
              <td>: {{ formatPrice($store.state.forms.pulsa_price) }}</td>
            </tr>
            <tr>
              <td>Kode Bank</td>
              <td>: {{ payment.name }}</td>
            </tr>
          </div>

          <b-button
            @click="nextStep"
            variant="light"
            style="width: 50%"
            class="child mt-4 mb-2"
          >
            Lanjut
          </b-button>
        </div>
        <!-- <b-button variant="light" style="width: 50%" class="child mt-4 mb-2">
          Lanjut
        </b-button> -->
      </div>
    </b-modal>
    <b-modal
      id="modal-detail"
      v-model="modalDetail"
      title="BootstrapVue"
      hide-footer
      @close="$emit('cancel', false)"
    >
      <div class="">
        <h5 style="color: #f9b410" class="child">Detail Pesanan</h5>
        <p style="font-size: 12px" class="child mx-5">
          Mohon konfirmasi pembayaran anda sudah benar.
        </p>
        <div>
          <table class="mt-4" border="0">
            <tr>
              <td>Nama</td>
              <td>: {{ $store.state.forms.pulsa_op }}</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>: {{ $store.state.forms.pulsa_code }}</td>
            </tr>
            <tr>
              <td>Harga</td>
              <td>: {{ formatPrice($store.state.forms.pulsa_price) }}</td>
            </tr>
            <tr>
              <td>Bayar dengan</td>
              <td>: {{ $store.state.forms.payment }}</td>
            </tr>
            <tr>
              <td>Order id</td>
              <td>
                :
                {{ orderId }}
              </td>
            </tr>
            <tr>
              <td>Transaction id</td>
              <td>: INV/{{ orderId }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>: {{ $store.state.forms.status }}</td>
            </tr>
          </table>
        </div>
        <b-button
          @click="nextStep"
          variant="light"
          style="width: 50%"
          class="mt-4 mx-auto mb-2"
        >
          Lanjut
        </b-button>
      </div>
    </b-modal>
    <!-- modal end -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import auth from "@/controller/auth.js";
export default {
  name: "Timer",
  props: {
    paymentMode: String,
    onUpdate: Function,
    confirm: Boolean,
    onTopup: Function,
  },
  data() {
    return {
      fixed: false,
      isNavOpen: false,
      modal: false,
      modalVer: false,
      modalLog: false,
      modalDetail: false,
      search: "",
      selected: {},
      tab: 0,
      forms: {},
      otp: {},
      options: [
        { value: null, text: "Pilih Bank" },
        { value: "120", text: "BCA" },
        { value: "120", text: "Mandiri " },
        { value: { C: "120" }, text: "BRI" },
        { value: "120", text: "BNI", disabled: true },
      ],
    };
  },
  computed: {
    orderId() {
      // new Date().toISOString().substr(0, 10).replace(/[-]/g, "")
      const date = new Date();
      return `${date.getUTCDate()}${date.getUTCHours()}`;
    },
    searchRes() {
      if (this.search.length == 0) return [];
      return this.$store.state.products.filter(
        (x) =>
          x.name.toString().toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );
    },
    optPayments() {
      return this.$store.state.payments
        .filter((x) => x.channel_category === this.paymentMode)
        .map(function (v) {
          return {
            value: JSON.stringify(v),
            text: v.name,
          };
        });
    },
    payment() {
      if (this.selected.payment) return JSON.parse(this.selected.payment);
      return {};
    },
    inOtp() {
      const { otp } = this;
      return `${otp.f1}${otp.f2}${otp.f3}${otp.f4}${otp.f5}${otp.f6}`;
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
  },
  watch: {
    payment(val) {
      this.$store.dispatch("updateForms", {
        value: val.channel_code,
        key: "payment",
      });
    },
    confirm(val) {
      this.modalDetail = val;
    },
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
    nextStep() {
      this.modalDetail = false;
      this.$store.commit("modalBank", false);
      this.$emit("close", true);
      console.log(this.$store.state.forms);
      // if (this.onTopup) {
      //   this.onTopup(true);
      // }
    },
    verification() {
      if (this.inOtp.match(/[undefined]/g)) {
        alert("Mohon isi data otp");
        return false;
      }
      this.forms.otp = this.inOtp;
      auth.verification(this.forms, this.$store, this.$router).then(() => {
        this.modalVer = false;
      });
    },
    hideModal() {
      if (this.tab == 0) {
        auth
          .login(this.forms, this.$store, this.$router)
          .catch((err) => console.log(err));
      } else {
        auth
          .register(this.forms)
          .then((res) => {
            this.$bvToast.toast(res.data.message, {
              title: `Login Berhasil`,
              variant: "success",
              solid: true,
              autoHideDelay: 5000,
              appendToast: true,
            });
            this.modalLog = false;
            this.modalVer = true;
          })
          .catch((error) => {
            this.$bvToast.toast(error, {
              title: `Maaf, lagi ada gangguan`,
              variant: "danger",
              solid: true,
              autoHideDelay: 2000,
              appendToast: true,
            });
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
td {
  padding-right: 20px;
}
.navbar {
  padding: 0rem 1rem !important;
}
@media (max-width: 576px) {
  .input-group {
    height: 50px;
    width: 100% !important;
  }
}

::v-deep .navbar-dark .navbar-nav .nav-link {
  color: #f9b410 !important;
}
.btn-secondary {
  background-color: #4c4e50;
  border-color: #4c4e50;
}
.bg-dark {
  background-color: #1c1c1e !important;
}
.tab-actived {
  color: #f9b410 !important;
}
.login {
  text-transform: uppercase;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  padding: 10px;

  border-radius: 20px;
}

.navbar-light .navbar-nav .nav-link {
  color: #f8f9fa;
}
// .nav-link {
//   font-size: 13px !important;
//   text-transform: uppercase;
//   margin-left: 15px;
//   height: 65px;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
// }
.nav-link:hover {
  color: white !important;
}
::v-deep .text-dark:hover {
  color: #2a7754 !important;
}
.navbar {
  box-shadow: none;

  /* the rest of your styling */
}
.input-style {
  outline: 0;
  border-width: 0px;
  color: white;
  background: #232323;
  margin-left: 1px;
}
.btn {
  margin-right: 10px;
}
.navbar-2 a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}
.navbar-main {
  background-color: #fff;
}

.search {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  border: 1px solid #f9b410 !important;
  border-radius: 10px !important;
}

::v-deep .el-input__inner {
  background-color: transparent !important;
  color: white !important;

  border: none !important;
}

// .border-bottom {
//     border-bottom: 1px solid #e5e7ea !important;
// }

.section-header {
  background-color: #232323;
}
.input-group-search {
  padding: 10px;
  position: absolute;
  margin-left: -40px;
  z-index: 3;
}
.li-pointer:hover {
  cursor: pointer;
}
.nohover:hover {
  background-color: transparent;
  cursor: default !important;
  /* or something like that */
}
.dropdown-toggle::after {
  display: none !important;
}

.dropdown {
  margin: auto;
}
.nav-link {
  color: #000;
}
.input-group {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 50%;
}

.modal-header .close {
  color: white;
}
.modal-header {
  padding: 0px !important;
  border-bottom: 1px solid #232323 !important;
}
.modal-body {
  padding: 0px !important;
  color: white !important;
}
.modal-content {
  padding: 20px;
  background-color: #232323 !important;
}
.verif {
  border-bottom: 1px solid #fff;
  outline: 0;
  border-width: 0 0 2px;
  background: #232323;
  color: white;
  width: 13px;
}
.child {
  text-align: center;
  margin: 0px;
  justify-content: center;
}
</style>
