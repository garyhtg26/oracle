<template>
  <div>
    <app-header
      @close="Object.assign(selected, $store.state.forms)"
      :paymentMode="paymentBank"
    ></app-header>
    <div class="page-heading">
      <!-- :style="`background-image: url(${!products[0] || products[0].icon_url})`" -->
      <!-- <div class="page-heading"> -->
      <div class="container">
        <div class="row">
          <div class="col-md-6 hidden-xs hidden-sm">
            <app-slider></app-slider>
          </div>
          <div class="col-offset-1 col-md-6 col-sm-12 ng-scope heading-content">
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
                YELLOWINS memudahkan topup games yang kamu inginkan setiap saat,
                dan dimana saja.

                <br />
                <br />
                Ada berbagai macam top up games. Jadi meski kamu sedang
                bersantai, berolahraga, atau bermain bersama teman, kamu tetap
                bisa melakukan top up di YELLOWINS

                <br />
                <br />
                Kamu juga bisa menjadi bagian dari komunitas kami dengan
                menggunakan fitur YELLOWINS PREMIUM, dan dapatkan penawaran
                menarik setiap menitnya dari YELLOWINSSTORE.
                <br />
                <br />
                Nikmati kemudahan bertransaksi dan jadilah pemenang bersama
                YELLOWINS.
              </p>
            </div>
          </div>
          <div
            class="col-12 col-md-6 ng-scope heading-content"
            v-if="$store.state.forms.preview"
          >
            <div class="section" style="padding: 30px">
              <h4 class="mb-4">Selesaikan pembayaran Anda</h4>
              <p style="color: white">
                Transaksi akan dibatalkan dalam waktu 24 jam, silahkan lakukan
                pembayaran untuk menyelesaikan transaksi anda
              </p>
              <hr style="border-top: 1px solid rgb(255 255 255 / 50%)" />
              <div style="width: 100%; height: 500px">
                <iframe
                  width="100%"
                  height="500px"
                  :src="$store.state.forms.preview.src"
                  frameborder="0"
                ></iframe>
              </div>
              <hr style="border-top: 1px solid rgb(255 255 255 / 50%)" />
              <div>
                <h3>Rincian Pembelian</h3>
                <p style="color: white">720 Diamon</p>
              </div>
              <table class="mt-4" border="0" style="color: white">
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
                  <td>Kode Pembayaran</td>
                  <td>: {{ orderId }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>: {{ $store.state.forms.status }}</td>
                </tr>
              </table>

              <router-link to="/">
                <button type="button" class="btn btn-light">
                  Lakukan pembelian lain
                </button>
              </router-link>
            </div>
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
        pulsa_price: 0,
      },
      paymentBank: "VIRTUAL_ACCOUNT",
      showPayment: true,
      payments: [
        { img: "gopay", code: "BCA", disabled: false },
        { img: "ovo", code: "BRI", disabled: false },
        { img: "dana", code: "MANDIRI", disabled: true },
        { img: "visa", code: "CREDIT_CARD", disabled: false },
        { img: "bca", code: "VIRTUAL_ACCOUNT", disabled: false },
      ],
    };
  },
  watch: {
    "$route.params.id"() {
      this.getItem();
    },
  },
  computed: {
    orderId() {
      const date = new Date();
      return `${date.getUTCDate()}${date.getUTCHours()}`;
    },
    icon_url() {
      return this.products.length > 0
        ? this.products[0].icon_url
        : require("@/assets/images/logo2.png");
    },
  },
  methods: {
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true,
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
      voucher.show(name, this.$store).then((res) => {
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
          appendToast: true,
        });
        return false;
      }
      transactions
        .store(this.selected)
        .then((e) => {
          this.$bvToast.toast(e.data.message, {
            title: `Transaksi berhasil Berhasil`,
            variant: "success",
            solid: true,
            autoHideDelay: 5000,
            appendToast: true,
          });
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
  mounted() {
    this.getItem();
    // transactions.payments().then((res) => {
    //   this.$store.commit("payments", res.data);
    // });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("forms", {});
    next();
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
  width: 200px;

  background-size: cover;
  background-position: top;
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
.yellowins {
  width: 100px;
  height: 100px;
  background-image: url(../assets/images/logo2.png);
  background-color: white;
  background-size: cover;

  border-radius: 25px;

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
</style>
