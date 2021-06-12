<template>
  <div>
    <app-header></app-header>
    <!-- <div
      class="page-heading"
      :style="`background-image: url(${!products[0] || products[0].icon_url})`"
    > -->
    <div class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-6"></div>
          <div class="col-xs-offset-1 col-6 ng-scope heading-content">
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
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="">
              <div
                class="buletan"
                v-if="products.length > 0"
                :style="`background-image: url(${products[0].icon_url})`"
              ></div>
              <div style="margin-top: 40px">
                <h3>{{ $route.params.id.replace(/[+]/g, " ") }}</h3>

                <p
                  class="field-instruction-text mt-4"
                  v-html="selected.pulsa_details || ''"
                ></p>
              </div>
            </div>
          </div>
          <div class="col-6 ng-scope heading-content">
            <div class="section" style="padding: 30px">
              <h2 class="mb-4">Pilih Nominal Top Up</h2>
              <div class="row">
                <div
                  v-for="x in products"
                  :key="x.pulsa_code"
                  class="col-4"
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
                  active: selected.payment == x.code,
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
import { mapActions, mapGetters } from "vuex";
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import voucher from "@/controller/voucher.js";
import transactions from "@/controller/transactions.js";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      products: [],
      selected: {
        pulsa_price: 0,
      },
      showPayment: true,
      payments: [
        { img: "gopay", code: "BCA", disabled: false },
        { img: "ovo", code: "BRI", disabled: false },
        { img: "dana", code: "MANDIRI", disabled: true },
        { img: "visa", code: "BRI", disabled: false },
        { img: "bca", code: "BRI", disabled: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["isProductLoading" /*'products'*/]),
    item() {
      let id = this.$route.params.id;
      if (this.products.length >= id) {
        let filterArr = this.products.filter((item) => {
          return item.id == id;
        });
        if (filterArr.length > 0) {
          return filterArr[0];
        }
      }
      return {};
    },
  },
  methods: {
    ...mapActions(["updateCart"]),
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
      this.selected.payment = x.code;
      this.showPayment = false;
      this.$nextTick().then(() => {
        this.showPayment = true;
      });
    },
    getItem() {
      const name = this.$route.params.id.replace(/[+]/g, " ");
      voucher.show(name).then((res) => {
        this.products = res.data.data;
      });
    },
    topUp() {
      this.selected.no_hp = this.$store.state.user.phone;
      const { selected } = this;
      if (!selected.payment || !selected.hp || !selected.no_hp) {
        alert("Harap lengkapi data");
        return false;
      }
      transactions
        .store(this.selected)
        .then((e) => {
          this.$message({
            type: "success",
            message: e.data.message,
          });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error,
          });
        });
    },
  },
  mounted() {
    this.getItem();
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
  height: 300px;
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(../assets/images/background.png);
  opacity: 0.9;
}
.buletan {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: top;
  border-radius: 100px;
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
  background-color: #fff !important;
  border-color: #e5e7ea !important;
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
  color: white;
}
</style>
