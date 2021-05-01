<template>
  <div>
    <scroll-fixed-header :fixed.sync="fixed" :threshold="56">
      <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      <router-link to="/">
                <img
                  :src="require('@/assets/images/logo.png')"
                  alt="Oracle"
                  width="150px"
                  style="padding: 20px"
                />
              </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/" active class="mr-4">HOME</b-nav-item>
        <b-nav-item href="/premium" class="mr-4">PREMIUM</b-nav-item>
        <b-nav-item href="#" class="mr-4">DOWNLOAD</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      
        <div class="input-group md-form form-sm form-2 pl-1" style="overflow: hidden;">
          <div class="el-select" style="border-color: white !important; border-radius: 20px; width: 50%; cursor: alias !important;">
          <div class="el-input el-input--suffix is-focus">
            <input type="text" autocomplete="" placeholder="Search" style="cursor:auto" class="el-input__inner">
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner" >
                <i class="el-select__caret el-input__icon el-icon-"></i>
              </span><!---->
            </span>
          </div>
          </div>
          <div class="input-group-append">
            <span data-v-4ece2516="" id="basic-text1" class="input-group-search" style="cursor: pointer">
              <i data-v-4ece2516="" aria-hidden="true" class="button fa fa-search" style="color: rgb(73, 80, 87);">
              </i>
            </span>
          </div>
        </div>
        <b-navbar-nav  class="ml-auto">
         <b-button
                v-b-modal.modal-login
                class="login "
                v-if="!$store.state.user.name"
              >
                <div
                  style="
                    padding: 3px;
                    line-height: 17px;
                    margin-left: 6px;
                    margin-right: 6px;
                  "
                >
                  login<span class="fa fa-chevron-right ml-2"></span>
                </div>
              </b-button>
           
              <div
                style="
                  padding: 10px;
                  line-height: 17px;
                  border-radius: 20px;
                  background-color: white;
                "
                v-else
              >
                {{ $store.state.user.name }}
              </div>
            
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    </scroll-fixed-header>
    <!-- modal -->
<b-modal id="modal-login" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 >Login</h5>
      <p>Selamat datang kembali</p>
      <p style="font-size:12px; " class="mx-5">Masukkan nomor telepon Anda dan kami akan mengirimkan kode verifikasi Anda</p>
      <div class="md-form " style="border-bottom: 1px solid white; margin-left:120px; margin-right:120px">
         <i >+62  </i>
         <input 
            type="number"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" 
            maxlength="12"
            placeholder="Nomor telepon" 
            style="outline: 0;border-width: 0px;color: white; background: #232323;"
            >
      </div>
      <b-button variant="light" @click="hideModal" v-b-modal.modal-verification  style="width:50%" class="mt-4 mb-2">Kirim</b-button>
   </div>
</b-modal>
<b-modal id="modal-verification" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 >Verification</h5>
      <p>Selamat datang kembali</p>
      <p style="font-size:12px; " class="mx-5">Enter your verification code below that we send to you. we send to your SMS</p>
      <div>
        
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
      </div>
      <b-button variant="light" style="width:50%" class="mt-4 mb-2">Login</b-button>
   </div>
</b-modal>
<b-modal id="modal-bank" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 >Silahkan Pilih Bank</h5>

      <p style="font-size:12px; " class="mx-5">Kami akan memberi Anda instruksi tentang cara menyelesaikan transfer di ATM atau di aplikasi Mobile Banking</p>
      <div>
        <b-form-select style="width:30%" v-model="selected" :options="options"></b-form-select>
        <div class="mt-3" style="    text-align-last: left;
">
        <tr>
  <td>Kode pembayaran </td>
  <td> : {{selected}}</td>
</tr>
<tr>
  <td>Jumlah</td> 
  <td> : {{selected}}</td>
</tr>
<tr>
  <td>Kode Bank</td> 
  <td> : {{selected}}</td>
</tr>
        </div>
      </div>
      <b-button  variant="light" style="width:50%" class="child mt-4 mb-2">Lanjut</b-button>
      
   </div>
</b-modal>
<b-modal id="modal-detail" title="BootstrapVue" hide-footer>
   <div class="">
      <h5 class="child">Detail Pesanan</h5>

      <p style="font-size:12px; " class="child mx-5">Mohon konfirmasi pembayaran anda sudah benar.</p>
      <div>
  <table class="mt-4" border="0" >
<tr>
  <td>Nama </td>
  <td> :</td>
</tr>
<tr>
  <td>ID</td> 
  <td> :</td>
</tr>
<tr>
  <td>Harga</td> 
  <td> :</td>
</tr>
<tr>
  <td>Bayar dengan </td> 
  <td> :</td>
</tr>
<tr>
  <td>Order id </td> 
  <td> :</td>
</tr>
<tr>
  <td>Transaction id </td> 
  <td> :</td>
</tr>
<tr>
  <td>Status </td> 
  <td> :</td>
</tr>

</table>
      </div>
      <b-button variant="light" style="width:50%" class="mt-4 mb-2">Lanjut</b-button>
      
   </div>
</b-modal>
<!-- modal end -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Timer",
  data() {
    return {
      fixed: false,
      isNavOpen: false,
      modal: false,
      selected: null,
        options: [
          { value: null, text: 'Pilih Bank' },
          { value: '120', text: 'BCA' },
          { value: '120', text: 'Mandiri ' },
          { value: { C: '120' }, text: 'BRI' },
          { value: '120', text: 'BNI', disabled: true }
        ]
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "cartValue", "currentUser", "cartItemList"]),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
  },
  methods: {
    ...mapActions(["logout"]),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>


<style scoped lang="scss">
td {
  padding-right:20px
}
.navbar {
  padding: 0rem 1rem  !important;
}
@media (max-width: 576px) {
    .input-group {
      height: 50px;
      width: 100%  !important;
    }
    .el-select{
      width: 100% !important;
    }
    .btn.login {
      margin: 20px;
    }
  }
a.nav-link {
 font-size: 15px;
     height: 60px;
    margin-top: 20px;
}

.nav-link.active {
  border-bottom: 2px solid #096866;


}

.navbar-dark .navbar-nav .nav-link {
    color: white  !important;
}
.btn-secondary {
  background-color: #4c4e50;
  border-color: #4c4e50;
}
.bg-dark {
    background-color: #232323 !important;
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

// .border-bottom {
//     border-bottom: 1px solid #e5e7ea !important;
// }

.section-header {
  background-color: #232323;
}
.input-group-search{
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
  font-size: 1.1em;
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
    border-bottom: 1px solid #232323  !important;

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
  color:white;
  width: 13px;
}
.child {
  text-align: center;
  margin: 0px;
  justify-content: center;
}
</style>
