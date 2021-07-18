<template>
  <div class="d-flex flex-column sticky-footer-wrapper">
    <main class="flex-fill">
      <app-header></app-header>
      <div class="page-heading">

      
      <div class="container mt-3">
        <b-row>
          <b-col cols="12" md="6">
            <app-slider></app-slider>
          </b-col>
          <b-col cols="12" md="6">
            <b-row>
              <b-col cols="6" v-for="x in news" :key="x.id">
                <a
                  :href="x.description"
                  target="_blank"
                  class="berita"
                  style="text-decoration: none;"
                >
                  <img
                    class="berita-img"
                    :src="x.photo"
                    style="max-width: 100%;"
                  />
                  <div class="berita-title my-2">
                    {{ x.title }}
                  </div>
                  <div class="link-berita">{{ x.description }}</div>
                </a>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      </div>

      <message-component></message-component>
      <div class="container product" style="background-color: #232323;"></div>
      <div class="container" style=" margin-bottom:20px;">
        <div class="row">
          <div class="col-md-12">
            <h6 class="mx-4 mt-4" style="color: white;">Mobile</h6>
            <app-store
              :category="pc"
              :products="products"
              :reverse="true"
            ></app-store>
            <!-- <div style="margin-top: -2px; width: 100%;">
              <el-image class="banner-top" :src="banner"></el-image>
            </div> -->
            <h6 class="mx-4 mt-4" style="color: white;">PC Games</h6>
            <app-store
              :category="pc"
              :products="products"
              :reverse="false"
            ></app-store>
            <!-- <h6 class="mx-4 mt-4" style="color: white">Games</h6>
            <app-store :category="others"></app-store> -->
            <div
              class="card panel-warning d-none d-sm-flex"
              id="reset-store-panel"
            ></div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from './templates/Header.vue'
import Slider from './Slider.vue'
import Store from './Store.vue'
import Footer from './templates/Footer.vue'
import MessageComponent from './common/MessageComponent.vue'
import pages from '@/controller/pages.js'
import voucher from '@/controller/voucher.js'
import auth from '@/controller/auth.js'

export default {
  components: {
    appHeader: Header,
    appSlider: Slider,
    appStore: Store,
    appFooter: Footer,
    MessageComponent,
  },
  data() {
    return {
      news: [],
      src: require('@/assets/images/4.png'),
      others: [
        'Gemscool',
        'Google Play US REGION',
        'Google Play Indonesia',
        'iTunes US REGION',
        'iTunes Gift Card Indonesia',
        'Lyto',
        'Megaxus',
        'Digicash',
        'Razer PIN',
        'Playstation',
        'Steam Sea',
        'Wifi ID',
        'UniPin',
        'Skyegrid',
        'Garena',
      ],
      mobile: [
        'Arena of Valor',
        'Bleach Mobile 3D',
        'Call of Duty Mobile',
        'Dragon Nest M - SEA',
        'Era of Celestials',
        'Free Fire',
        'PUBG Mobile',
        'Speed Drifters',
        'Ragnarok M',
      ],
      pc: ['Voucher PB Zepetto', 'Valorant'],
      berita: require('@/assets/images/berita1.jpeg'),
      banner: require('@/assets/images/banner.png'),
      // products: [],
    }
  },
  computed: {
    products() {
      return this.$store.state.products; 
    }
  },
  methods: {
    ...mapActions(['getShoppingCart', 'listenToProductList']),
    getItem() {
      this.isProductLoading = true
      voucher.list(this.$store).then((res) => {
        // this.products = res
        this.$store.commit('products', res)
        this.isProductLoading = false
      })
      if (this.$store.state.authentication) {
        auth.prepare(this.$store, true)
      }
    },
  },
  created() {
    pages.index(0).then((e) => (this.news = e))
    this.getItem()
  },
}
</script>

<style>
.page-heading{
   background-image: url(../assets/images/bg.png);

  background-size: contain;
  opacity: 0.9;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
a {
  color: #212529;
  text-decoration: none;
  background-color: transparent;
}

#reset-store-panel {
  position: fixed;
  bottom: 0px;
  right: 0px;
}

body,
.sticky-footer-wrapper {
  min-height: 100vh;
}
.berita {
  cursor: pointer;
  text-decoration: none;
  text-decoration-line: none;
  text-decoration-thickness: 0px;
}
.berita a {
  color: #ffffff;
  text-decoration: none;
}
.berita-img {
  height: 175px;
  border-radius: 20px;
}
.berita-title {
  color: #f9b410;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
}
.link-berita {
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.child {
  text-align: center;
  margin: 0px;
  justify-content: center;
}
.flex-fill {
  flex: 1 1 auto;
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
/* footer {
    height: 40px;
    color: #666;
    padding: 10px 0 10px 0;
    font-size: 85%;
  }
  footer a {
    color: #999;
  }
  footer a:hover {
    color: #efefef;
  }
  @media (max-width: 576px) {
    footer {
      height: 50px;
    }
  } */
</style>
