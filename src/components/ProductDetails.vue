<template>
<div>
  <app-header></app-header>

<div class="page-heading" >
        <div class="container">
          <div class="row">
            <div class="col-xs-5">

            </div>
            <div class="col-xs-offset-1 col-xs-6 ng-scope heading-content">
              <div class="section" style="padding:30px">
                  <h2 class="mb-4">Masukan Game ID</h2>
                  <div>
                    <input class="form-input " type="text" placeholder="Silahkan masukan ID anda">
                  </div>
                  <p class="field-instruction-text mt-2">
                    Untuk menemukan ID Anda, klik pada ikon karakter. User ID tercantum di bawah nama karakter Anda. Contoh: '1234567890'.
                  </p>
              </div>
            </div>
          </div>
            
        </div>
    </div>
<section>
  <div class="container">
    <div class="row">
      <div class="col-xs-6">
        <div class="">
          <div class="buletan"></div>
          <div style="margin-top:40px">
            <h3> Free Fire</h3>
            <p class="field-instruction-text mt-4">
              PERINGATAN: Metode pembayaran DANA hanya tersedia untuk Pengguna Aplikasi. Harap pastikan bahwa aplikasi DANA Anda telah diperbarui dan memiliki saldo yang mencukupi sebelum melakukan top up.
            <br><br>
            Top up diamond FF hanya dalam hitungan detik! Cukup masukan User ID Free Fire Anda, pilih jumlah Diamond yang Anda inginkan, kemudian selesaikan pembayaran. Setelah pembayaran berhasil Diamond FF akan secara langsung ditambahkan ke akun Free Fire (FF) Anda.
            <br><br>
             Bayarlah menggunakan GoPay, OVO, DANA, hingga Transfer Bank.  Oracle adalah cara terbaik untuk top up diamond (FF) Free Fire secara online tanpa kartu kredit. Anda juga dapat mendaftarkan sebagai pengguna premium dan mendapatkan diskon yang menarik.
            </p>
          </div>
        </div>
      </div>
      <div class=" col-xs-6 ng-scope heading-content">
              <div class="section" style="padding:30px">
                  <h2 class="mb-4">Pilih Nominal Top Up</h2>
                  <div class="row">
                    <div class="col-xs-4">
                      <div class="card active"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                    <div class="col-xs-4">
                      <div class="card"> 150 Diamon</div>
                    </div>
                  </div>
              </div>
              <div class="section" style="padding:30px">
                  <h2 class="mb-4">Pilih Metode Pembayaran</h2>
                  <div class="card p-2">
                    <div class="row">
                      <div class="col-xs-6">
                        <img :src="require('@/assets/images/payments/gopay.png')" class="payment-img"  >
                    
                      </div>
                      <div class="col-xs-offset-1 col-xs-5">
                        <div class="payment-price">Rp 100.000</div>
                      </div>
                    </div>
                  </div>
                  <div class="card p-2">
                    <div class="row">
                      <div class="col-xs-6">
                        <img :src="require('@/assets/images/payments/ovo.png')" class="payment-img"  >
                    
                      </div>
                      <div class="col-xs-offset-1 col-xs-5">
                        <div class="payment-price">Rp 100.000</div>
                      </div>
                    </div>
                  </div>
                  <div class="card disable p-2" >
                    <div class="row">
                      <div class="col-xs-6">
                        <img :src="require('@/assets/images/payments/dana.png')" class="payment-img"  >
                    
                      </div>
                      <div class="col-xs-offset-1 col-xs-5">
                        <div class="payment-price">Rp 100.000</div>
                      </div>
                    </div>
                  </div>   
              </div>
              <button type="button" class="btn btn-light">Beli</button>
       </div>

    </div>

  </div>
</section>
<div style="margin-top:50px"></div>
<app-footer></app-footer>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import Header from './templates/Header';
import Footer from './templates/Footer';
import base from '@/router/link.js'; 
import axios from "axios";
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
    }
  },
  computed: {
    ...mapGetters(['isProductLoading', /*'products'*/]),
    item() {
      let id = this.$route.params.id;
      if (this.products.length >= id) {
        let filterArr = this.products.filter((item) => {
          return item.id == id
        });
        if (filterArr.length > 0) {
          return filterArr[0];
        }
      }
      return {};
    }
  },
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
      };
      // console.log(order);
      this.updateCart(order);
    },
    getItem () {
    axios
    .get(base.url + "products" )
    .then(response => (this.products = response.data))
  },
  },
  mounted() {
    this.getItem();
  },
}
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
.payment-img{
  float: left;
  width: 90px;
  padding: 8px;
  margin-top: 2px;

}
.payment-price{
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
.card.disable{
  opacity: 0.7;
  cursor: not-allowed !important;
}
.card.active {
  background-color: rgb(144, 238, 144);
  border-color: rgb(77, 182, 77);
}
.page-heading{
 background-image:url(../assets/images/banners/2.png); 
 height:300px;
 background-size: cover;
 opacity: 0.9;
}
.buletan{
width:100px;
  height:100px;
  background-image: url( ../assets/images/products/FF.png);
  background-size:cover;
  background-position:top;
  border-radius:100px;
  margin-top: -50px ;
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
    font-family: Lato-Italic,sans-serif;
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
.heading-content{
      margin-top: 40px;

}
.btn-light {
    background-color: #fff !important;
    border-color: #e5e7ea !important;
}
.mt-3, .my-3 {
    margin-top: 1rem !important;
}
h2, .h2 {
    font-size: 2rem;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 0.5rem;
    font-weight: bold;
    line-height: 1.3;
    color: white;
}

</style>
