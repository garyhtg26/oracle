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
 
            <b-navbar-nav class="ml-auto" >
          
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
                  style="padding: 0px; width: 200px"
                >
                  <div style="max-height: 300px; overflow: auto">
                    <b-list-group style="padding: 0px">
                      <b-list-group-item
                        style="padding: 5px"
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
                  <em>{{ $store.state.user.name }}</em>
                </template>
                <b-dropdown-item @click="logoutUser">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </scroll-fixed-header>
    <!-- modal -->
    <b-modal id="modal-login" title="BootstrapVue" hide-footer>
      <div class="child">
        <h5 style="color: #f9b410">Login</h5>
        <p>Selamat datang kembali</p>
        <p style="font-size: 12px" class="mx-5">
          Masukkan nomor telepon Anda dan kami akan mengirimkan kode verifikasi
          Anda
        </p>
        <div
          class="md-form"
          style="
            border-bottom: 1px solid white;
            margin-left: 120px;
            margin-right: 120px;
          "
        >
          <i>+62</i>
          <input
            type="number"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="12"
            v-model="forms.phone"
            placeholder="Nomor telepon"
            style="
              outline: 0;
              border-width: 0px;
              color: white;
              background: #232323;
            "
          />
        </div>
        <b-button
          variant="light"
          @click="hideModal"
          v-b-modal.modal-verification
          style="width: 50%"
          class="mt-4 mb-2"
        >
          Kirim
        </b-button>
      </div>
    </b-modal>
    <b-modal id="modal-verification" title="BootstrapVue" hide-footer>
      <div class="child">
        <h5 style="color: #f9b410">Verification</h5>
        <p>Selamat datang kembali</p>
        <p style="font-size: 12px" class="mx-5">
          Enter your verification code below that we send to you. we send to
          your SMS
        </p>
        <div>
          <input type="text" maxlength="1" class="verif mx-2" />
          <input type="text" maxlength="1" class="verif mx-2" />
          <input type="text" maxlength="1" class="verif mx-2" />
          <input type="text" maxlength="1" class="verif mx-2" />
          <input type="text" maxlength="1" class="verif mx-2" />
        </div>
        <b-button variant="light" style="width: 50%" class="mt-4 mb-2">
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
          <!-- <b-form-select
            style="width: 30%"
            v-model="selected"
            :options="options"
          ></b-form-select> -->
          <b-form-select
            style="width: 80%"
            v-model="selected.payment"
            :options="
              $store.state.payments
                .filter((x) => x.channel_category === paymentMode)
                .map(function (v) {
                  return {
                    value: JSON.stringify(v),
                    text: v.name,
                  };
                })
            "
          ></b-form-select>
          <div class="mt-3" style="text-align-last: left">
            <tr>
              <td>Kode pembayaran</td>
              <td>: {{ payment.business_id }}</td>
            </tr>
            <tr>
              <td>Jumlah</td>
              <td>: {{ $store.state.forms.pulsa_price }}</td>
            </tr>
            <tr>
              <td>Kode Bank</td>
              <td>: {{ payment.name }}</td>
            </tr>
          </div>
          <b-button
            v-b-modal.modal-detail
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
              <td>: {{ $store.state.forms.pulsa_price }}</td>
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
    },
    hideModal() {
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
          this.$store.commit("user", this.forms);
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
