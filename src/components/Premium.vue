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
             
            <el-image class="banner-top" style="width:200px" :src="require('@/assets/images/logo2.png')"></el-image>
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
          <div class="col-6">
            <div class="">
              <div class="buletan"></div>
              <div style="margin-top: 40px">
                <h3>Tentang Kami</h3>
                <p class="field-instruction-text mt-4">
                  YELLOWINS memudahkan topup games yang kamu inginkan setiap saat, dan  dimana saja.


                  <br /><br />
                 Ada berbagai macam top up games. Jadi meski kamu sedang bersantai, berolahraga, atau bermain bersama teman, kamu tetap bisa melakukan top up di YELLOWINS

                  <br /><br />
                  Kamu juga bisa menjadi bagian dari komunitas kami dengan menggunakan fitur YELLOWINS PREMIUM, dan dapatkan penawaran menarik setiap menitnya dari YELLOWINSSTORE.
                  <br /><br />
                Nikmati kemudahan bertransaksi dan jadilah pemenang bersama YELLOWINS. 

                </p>
              </div>
            </div>
          </div>
          <div class="col-6 ng-scope heading-content">
            <div class="section" style="padding: 30px"  v-if="!$store.state.user.name">
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
                  v-model="selected.region"
                />
              </div>
            </div>
            <div>
              <h4> Pilih Paket</h4>
              <div class="row">
                <div class="col p-2">
                  <button type="button" class="btn btn-white active">Bronze</button>
                </div>
                <div class="col p-2">
                  <button type="button" class="btn btn-white">Silver</button>
                </div>
                <div class="col p-2">
                  <button type="button" class="btn btn-white">Gold</button>
                </div>
                
              </div>
            </div>
             <div v-if="showPayment" class="section" style="padding: 30px">
              <h6 class="mb-4">Pilih Metode Pembayaran</h6>
              <div
                v-for="x in payments"
                :key="x.code"
                class="card p-2"
                :class="{
                  disable: x.disabled,
                  active: selected.payment == x.code,
                }"
                @click="selPay(x)"
              >
                <div class="row">
                  <div class="col-sm-7">
                    <img
                      :src="require(`@/assets/images/payments/${x.img}.png`)"
                      class="payment-img"
                    />
                  </div>
                  <div class="col-xs-offset-1 col-sm-5">
                    <div class="payment-price">RP.10.000</div>
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
export default {
  components: {
    appHeader: Header,
        appSlider: Slider,
    appFooter: Footer,
  },
  data() {
    return {
      payments: [
        { img: "gopay", code: "BCA", disabled: false },
        { img: "ovo", code: "BRI", disabled: false },
        { img: "dana", code: "MANDIRI", disabled: true },
        { img: "visa", code: "CREDIT_CARD", disabled: false },
        { img: "bca", code: "VIRTUAL_ACCOUNT", disabled: false },
      ],
      paymentBank: "VIRTUAL_ACCOUNT",
      form: {},
      selected: {
        pulsa_code: "redeem",
        pulsa_price: 10000,
        pulsa_op: "Premium Member",
      },
      showPayment: true,
    };
  },
  mounted() {
    transactions.payments().then((res) => {
      this.$store.commit("payments", res.data);
    });
    this.form = Object.assign({}, this.$store.state.user);
  },
  methods: {
    selPay(x) {
      if (["VIRTUAL_ACCOUNT", "CREDIT_CARD"].indexOf(x.code) > -1) {
        this.$store.commit("forms", this.selected);
        this.$store.commit("modalBank", true);
        this.paymentBank = x.code;
        console.log(this.$store.modalBank);
        return false;
      }
      this.selected.payment = x.code;
      this.showPayment = false;
      this.$nextTick().then(() => {
        this.showPayment = true;
      });
    },
    save() {
      const forms = {
        region: this.selected.region,
        payment: this.$store.state.forms.payment,
      };
      transactions.redeem(forms).then((e) => {
        this.$bvToast
          .toast(e.data.message, {
            title: `Transaksi berhasil Berhasil`,
            variant: "success",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true,
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
  width: 90px;
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
  background-color: rgb(144, 238, 144);
  border-color: rgb(77, 182, 77);
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
  margin-top: -50px;
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
  background-color:#F9B410  !important;
  border-color: #ffb300 !important;
}
.btn-white {
  background-color:#fff  !important;
  border-color: #fff !important;
}
.btn-white.active {
  background-color:#F9B410  !important;
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
  color: #F9B410
;
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
