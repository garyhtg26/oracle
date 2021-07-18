<template>
  <div>
    <app-header
      @close="Object.assign(selected, $store.state.forms)"
      :paymentMode="paymentBank"
    ></app-header>
    <div class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-md-6 hidden-xs hidden-sm">
            <app-slider></app-slider>
          </div>

          <div class="col-offset-1 col-md-6 col-sm-12 ng-scope heading-content">
            <el-image
              class="banner-top mx-auto"
              style="width: 200px"
              :src="require('@/assets/images/logo2.png')"
            ></el-image>
          </div>
          <!-- <div
            style="
              padding: 10px;
              line-height: 17px;
              border-radius: 20px;
              background-color: white;
            "
            v-else
          >
            {{ $store.state.user.name }}
          </div> -->
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="">
              <div class="buletan"></div>
              <div style="margin-top: 40px">
                <h3>Tentang Kami</h3>
                <p class="field-instruction-text mt-4">
                  YELLOWINS memudahkan topup games yang kamu inginkan setiap
                  saat, dan dimana saja.

                  <br /><br />
                  Ada berbagai macam top up games. Jadi meski kamu sedang
                  bersantai, berolahraga, atau bermain bersama teman, kamu tetap
                  bisa melakukan top up di YELLOWINS

                  <br /><br />
                  Kamu juga bisa menjadi bagian dari komunitas kami dengan
                  menggunakan fitur YELLOWINS PREMIUM, dan dapatkan penawaran
                  menarik setiap menitnya dari YELLOWINSSTORE.
                  <br /><br />
                  Nikmati kemudahan bertransaksi dan jadilah pemenang bersama
                  YELLOWINS.
                </p>
              </div>
            </div>
            <iframe
              v-if="iframe"
              :src="iframe"
              frameborder="0"
              style="margin-top: 50px"
              height="600px"
              width="100%"
            ></iframe>
          </div>
          <div class="col-md-6 col-12 ng-scope heading-content">
            <div
              class="section"
              style="padding: 30px"
              v-if="!$store.state.user.name"
            >
              <h2 class="mb-4">Masukan No HP</h2>
              <div>
                <input
                  class="form-input"
                  type="text"
                  placeholder="Silahkan masukan ID anda"
                  v-model="form.phone"
                />
              </div>
              <p class="field-instruction-text mt-2">
                Jika Anda sudah memiliki akun, silakan masukkan Nomor HP diatas.
                daftar jika anda belum memiliknya.
              </p>
            </div>

            <div class="section" style="padding: 30px">
              <h2 class="mb-4">Provinsi</h2>
              <div>
                <input
                  class="form-input"
                  type="text"
                  placeholder="Silahkan masukan provinsi anda"
                  v-model="form.region"
                />
              </div>
            </div>
            <!-- <div>
              <b-row no-gutters align-h="between" align-v="start">
                <b-col cols="12">
                  <h4>Pilih Paket</h4>
                </b-col>
                <div class="col-4 p-1" v-for="x in paket" :key="x.paket">
                  <button
                    @click="selected = x"
                    type="button"
                    class="btn btn-white"
                    :class="{ active: x.pulsa_op == selected.pulsa_op }"
                  >
                    {{ x.pulsa_op }}
                  </button>
                </div>
              </b-row>
            </div> -->
            <div v-if="showPayment" class="section" style="padding: 30px">
              <h6 class="mb-4">Pilih Metode Pembayaran</h6>
              <div
                v-for="x in payments"
                :key="x.code"
                class="card p-2"
                :class="{
                  disable: x.disabled,
                  active: selp == x.code,
                }"
                @click="selPay(x)"
              >
                <div class="row">
                  <div class="col-4">
                    <img
                      :src="require(`@/assets/images/payments/${x.img}.png`)"
                      class="payment-img"
                    />
                  </div>
                  <div class="col-xs-offset-1 col-8">
                    <div class="payment-price" style="float: right">
                      {{ formatPrice(selected.pulsa_price || 0) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section" style="padding: 30px">
              <h2 class="mb-4">Masukan Kode Redeem</h2>
              <div>
                <input
                  class="form-input"
                  type="text"
                  v-model="form.redeem_code"
                  placeholder="Silahkan masukan Kode anda"
                />
              </div>
              <p class="field-instruction-text mt-2">
                Jika Anda memiliki kode redeem, silakan masukkan di atas.
                abaikan jika Anda tidak memilikinya.
              </p>
            </div>
            <button type="button" class="btn btn-light" @click="save">
              Beli
            </button>
          </div>
        </div>
      </div>
    </section>
    <div style="margin-top: 50px"></div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import Slider from "./Slider.vue";
import transactions from "@/controller/transactions.js";
import auth from "@/controller/auth.js";
export default {
  components: {
    appHeader: Header,
    appSlider: Slider,
    appFooter: Footer,
  },
  computed: {
    payments() {
      return transactions.optPayments(this.$store, this.selected);
    },
  },
  data() {
    return {
      paymentBank: "VIRTUAL_ACCOUNT",
      form: {},
      iframe: false,
      paket: [
        {
          paket: "Bronze",
          pulsa_price: 10000,
          pulsa_op: "Bronze",
          pulsa_code: "bronze",
          available: 5,
        },
        {
          paket: "Silver",
          pulsa_price: 29000,
          pulsa_op: "Silver",
          pulsa_code: "silver",
          available: 20,
        },
        {
          paket: "Gold",
          pulsa_price: 35000,
          pulsa_op: "Gold",
          pulsa_code: "Gold",
          available: 28,
        },
      ],
      selected: {
        pulsa_code: "Premium",
        pulsa_price: 12000,
        pulsa_op: "Bronze",
        available: 28,
      },
      showPayment: true,
      selp: "",
    };
  },
  mounted() {
    // transactions.payments().then((res) => {
    //   this.$store.commit("payments", res.data);
    // });
    if (!this.$store.state.user.id) {
      this.$bvModal.show("modal-login");
    }
    this.form.region = this.$store.state.user.address;
    this.form = Object.assign({}, this.$store.state.user);
  },
  methods: {
    selPay(x) {
      const cards = ["VIRTUAL_ACCOUNT", "CREDIT_CARD"];
      if (cards.indexOf(x.code) > -1) {
        if (x.disabled) {
          this.$bvToast.toast(`Pembayaran dengan ${x.code} belum didukung`, {
            title: `Pembayaran tidak valid`,
            variant: "error",
            solid: true,
            autoHideDelay: 2000,
            appendToast: true,
          });
          return false;
        }
        this.$store.commit("forms", this.selected);
        this.$store.commit("modalBank", true);
        this.paymentBank = x.code;
        this.selp = x.code;
        return false;
      }

      const cek = this.payments.filter((y) => y.code == x.code)[0];
      if (cek && cek.disabled) {
        this.$bvToast.toast(`Pembayaran dengan ${x.code} belum didukung`, {
          title: `Pembayaran tidak valid`,
          variant: "error",
          solid: true,
          autoHideDelay: 2000,
          appendToast: true,
        });
        return false;
      }
      this.selected.payment = x.code;
      this.$store.commit("forms", this.selected);
      this.showPayment = false;
      this.selp = x.code;
      this.$nextTick().then(() => {
        this.showPayment = true;
      });
    },
    save() {
      if (this.form.redeem_code) {
        transactions
          .redeemCode(this.form, this.$store)
          .then((e) => {
            auth.prepare(this.$store, true);
            this.$bvToast.toast(e.data.message, {
              title: `Transaksi berhasil Berhasil`,
              variant: "success",
              solid: true,
              autoHideDelay: 5000,
              appendToast: true,
            });
          })
          .catch(() => {
            this.$bvToast.toast(
              "Pastikan anda sudah login, dan kode masih aktif",
              {
                title: `Error :(`,
                variant: "danger",
                solid: true,
                autoHideDelay: 5000,
                appendToast: true,
              }
            );
          });
        return;
      }
      const forms = {
        pulsa_code: this.selected.pulsa_code,
        region: this.form.region,
        payment: this.$store.state.forms.payment,
        paket: this.selected.pulsa_op,
        price: this.selected.pulsa_price,
        available: this.selected.available,
      };
      transactions
        .redeem(forms, this.$store)
        .then((e) => {
          this.$bvToast.toast(e.data.message, {
            title: `Transaksi berhasil Berhasil`,
            variant: "success",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true,
          });
          if (e.data.src) {
            let data = Object.assign({}, this.selected);
            data.payment = this.$store.state.forms.payment;
            data.status = "Pending";
            data.preview = e.data;
            this.$store.commit("forms", data);
            this.$router.push(`/payment/${data.pulsa_op}`);
          }
          // this.iframe = e.data.src;
        })
        .catch((error) => {
          this.$bvToast.toast(error, {
            title: `Maaf, ada sedikit maintenance`,
            variant: "danger",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true,
          });
        });
    },
  },
};
</script>

<style scoped>
.btn {
  font-size: medium;
  line-height: 40px;
  display: block;
  width: 90%;
  margin: 25px;
  border-radius: 4px;
}
.payment-img {
  float: left;
  /* width: 90px; */
  height: 40px;
  padding: 8px;
  margin-top: 2px;
}
.payment-price {
  color: black;
  font-size: 13px;
}
.card {
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid #cdcbcd;
  text-align: center;
  padding: 0 5px;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}
.card.disable {
  opacity: 0.7;
  cursor: not-allowed !important;
}
.card.active {
  background-color: #ffb300;
  border-color: #ffb300;
}
.page-heading {
  background-image: url(../assets/images/bg.png);

  background-size: contain;
  opacity: 0.9;
}
.buletan {
  width: 100px;
  height: 100px;
  background-image: url(../assets/images/logo2.png);
  background-color: white;
  background-size: cover;

  border-radius: 25px;
}
.section {
  background-color: #232323;
  border-radius: 6px;
  padding: 15px;
  margin: 25px 0;
  box-shadow: 1px 2px 3px #302f2e;
  animation: fadeIn ease 1s;
}
.field-instruction-text {
  padding-right: 12px;
  font-size: 12px;
  font-family: Lato-Italic, sans-serif;
  line-height: 16px;
  margin: 5px 0 0;
  text-align: justify;
  color: #fff;
}
.form-input {
  line-height: 46px;
  border-radius: 4px;
  border: 1px solid #cdcbcd;
  text-align: center;
  padding: 0 5px;
  width: 100%;
}
.heading-content {
  margin-top: 40px;
}
.btn-light {
  background-color: #f9b410 !important;
  border-color: #ffb300 !important;
}
.btn-white {
  background-color: #fff !important;
  border-color: #fff !important;
}
.btn-white.active {
  background-color: #f9b410 !important;
  border-color: #ffb300 !important;
}
.mt-3,
.my-3 {
  margin-top: 1rem !important;
}
h2,
.h2 {
  font-size: 2rem;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  margin-bottom: 0.5rem;
  font-weight: bold;
  line-height: 1.3;
  color: #f9b410;
}
@media (max-width: 576px) {
  .input-group {
    height: 50px;
    width: 100% !important;
  }
  .el-select {
    width: 100% !important;
  }
  .btn.login {
    margin: 20px;
  }
}
</style>
