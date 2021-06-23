<template>
  <div>
    <app-header
      @close="Object.assign(selected, $store.state.forms)"
      :paymentMode="paymentBank"
    ></app-header>
    <div
      class="page-heading"
     
    >
     <!-- :style="`background-image: url(${!products[0] || products[0].icon_url})`" -->
      <!-- <div class="page-heading"> -->
      <div class="container">
        <div class="row">
          <div class="col-md-6 hidden-xs hidden-sm">
               <app-slider></app-slider>
          </div>
          <div class="col-offset-1 col-md-6 col-sm-12 ng-scope heading-content ">
           <div class="mt-5">
              <img class="buletan" :src="`${icon_url}`" />
              <div style="margin-top: 40px">
                <h6>{{ $route.params.id.replace(/[+]/g, " ") }}</h6>
                <p
                  class="field-instruction-text mt-4"
                  v-html="selected.pulsa_details || ''"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="yellowins"></div>
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
          <div class="col-12 col-md-6 ng-scope heading-content">
             <div class="section" style="padding: 30px">
              <h2 class="mb-4">Masukan Game ID</h2>
              <div>
                <input
                  class="form-input"
                  type="text"
                  v-model="selected.hp"
                  placeholder="Silahkan masukan ID anda"
                />
              </div>
              <p class="field-instruction-text mt-2">
                Untuk menemukan ID Anda, klik pada ikon karakter. User ID
                tercantum di bawah nama karakter Anda. Contoh: '1234567890'.
              </p>
            </div>
            <div class="section" style="padding: 30px">
              <h2 class="mb-4">Pilih Nominal Top Up</h2>
              <div class="row">
                <div
                  v-for="x in products"
                  :key="x.pulsa_code"
                  class="col-md-4 col-6"
                  @click="selected = x"
                >
                  <div
                    class="card"
                    :class="{ active: selected.pulsa_code === x.pulsa_code }"
                  >
                    {{ x.pulsa_nominal }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showPayment" class="section" style="padding: 30px">
              <h2 class="mb-4">Pilih Metode Pembayaran</h2>
              <div
                v-for="x in payments"
                :key="x.code"
                class="card p-2"
                :class="{
                  disable: x.disabled,
                  active: selected.payment == x.code
                }"
                @click="selPay(x)"
              >
                <div class="row">
                  <div class="col-7">
                    <img
                      :src="require(`@/assets/images/payments/${x.img}.png`)"
                      class="payment-img"
                    />
                  </div>
                  <div class="col-xs-offset-1 col-5">
                    <div class="payment-price">
                      {{ formatPrice(selected.pulsa_price) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" @click="topUp" class="btn btn-light">
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
// import { mapActions, mapGetters } from "vuex";
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import voucher from "@/controller/voucher.js";
import Slider from "./Slider.vue";
import transactions from "@/controller/transactions.js";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    appSlider: Slider,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      products: [],
      selected: {
        pulsa_price: 0
      },
      paymentBank: "VIRTUAL_ACCOUNT",
      showPayment: true,
      payments: [
        { img: "gopay", code: "BCA", disabled: false },
        { img: "ovo", code: "BRI", disabled: false },
        { img: "dana", code: "MANDIRI", disabled: true },
        { img: "visa", code: "CREDIT_CARD", disabled: false },
        { img: "bca", code: "VIRTUAL_ACCOUNT", disabled: false }
      ]
    };
  },
  watch: {
    "$route.params.id"() {
      this.getItem();
    }
  },
  computed: {
    icon_url() {
      return this.products.length > 0
        ? this.products[0].icon_url
        : "https://projects.papermindvention.com/oracle/backend/public/images/Bleach Mobile 3D.png";
    }
  },
  methods: {
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
      };
      // console.log(order);
      this.updateCart(order);
    },
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
    getItem() {
      const name = this.$route.params.id.replace(/[+]/g, " ");
      voucher.show(name, this.$store).then(res => {
        console.log(res);
        this.products = res.data;
      });
    },
    topUp() {
      this.selected.no_hp = this.$store.state.user.phone;
      const { selected } = this;
      if (!selected.payment || !selected.hp || !selected.no_hp) {
        alert("Harap lengkapi data");
        this.$bvToast.toast("Login", {
          title: `Silahkan login terlebih dahulu`,
          variant: "error",
          solid: true,
          autoHideDelay: 2000,
          appendToast: true
        });
        return false;
      }
      transactions
        .store(this.selected)
        .then(e => {
          this.$bvToast.toast(e.data.message, {
            title: `Transaksi berhasil Berhasil`,
            variant: "success",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true
          });
        })
        .catch(error => {
          this.$bvToast.toast(error, {
            title: `Maaf, ada sedikit maintenance`,
            variant: "danger",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true
          });
        });
    }
  },
  mounted() {
    this.getItem();
    transactions.payments().then(res => {
      this.$store.commit("payments", res.data);
    });
  }
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
  background-color:#F9B410  !important;
  border-color: #ffb300 !important;
}
.page-heading {
  background-image: url(../assets/images/bg.png);

  background-size: contain;
  opacity: 0.9;
}
.buletan {
  width: 200px;

  background-size: cover;
  background-position: top;
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
  background-color: #F9B410 !important;
  border-color: #ffb300 !important;
}
.yellowins{

  width: 100px;
  height: 100px;
  background-image: url(../assets/images/logo2.png);
  background-color: white;
  background-size: cover;

  border-radius: 25px;
  margin-top: -50px;

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
</style>
