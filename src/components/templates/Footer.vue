<template>
    <footer class="footer">
    <div class="container">
		<img
              :src="require('@/assets/images/logo.png')"
              alt="Oracle"
              width="150px"
              style="padding-bottom:40px"
            />
        <div class="row">
        <div class="col-sm-4">
            <h4 class="title">Info Kontak</h4>
            <p><i class="fas fa-map-marker-alt"></i> Jalan xxxx No.xx Kec.xxxx, Kel. xxxx, Kota xxxx</p>
            <p><i class="fas fa-phone-alt"></i> 012-3456-7890</p>
            <p><i class="fas fa-envelope"></i> customer@oracle.com</p>
     
        </div>
        <div class="col-sm-4">
            <h4 class="title">Social Media</h4>
           
            <ul class="social-icon">
                <a href="#" class="social"><i class="fab fa-facebook" aria-hidden="true"></i></a>
                <a href="#" class="social"><i class="fab fa-twitter" aria-hidden="true"></i></a>
                <a href="#" class="social"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                <a href="#" class="social"><i class="fab fa-youtube" aria-hidden="true"></i></a>
                <a href="#" class="social"><i class="fab fa-telegram-plane" aria-hidden="true"></i></a>

            </ul>
        </div>
     
        <div class="col-sm-4">
            <h4 class="title">Download App</h4>
            
            <div style="display: flex; justify-content: center; margin: 16px 0px;">
						<a class="unf-footer-android" aria-label="android" style="margin-right: 8px;">&nbsp;</a>
						<a  class="unf-footer-ios" aria-label="ios">&nbsp;</a>
					</div>
            </div>
        </div>
        <hr>
        <div class="row text-center" style="justify-content: center;"><a style="color: #fff;">Copyright © 2021 <span style="">Oracle.</span> All right reserved.</a></div>
    </div>	
</footer>
</template>

<script>
export default {
	
}
</script>

<style scoped>
.unf-footer-android {
    background-image: url(https://ecs7.tokopedia.net/assets-unify/img/ic-download-android.svg);
    width: 135px;
}
.unf-footer-ios {
    background-image: url(https://ecs7.tokopedia.net/assets-unify/img/ic-download-ios.svg);
    width: 125px;
}
.unf-footer-android {
  background-image: url(https://ecs7.tokopedia.net/assets-unify/img/ic-download-android.svg);
  width: 135px;
}
.unf-footer-ios {
  background-image: url(https://ecs7.tokopedia.net/assets-unify/img/ic-download-ios.svg);
  width: 125px;
}
.unf-footer-android,
.unf-footer-ios {
  cursor: pointer;
  height: 40px;
}
.unf-footer-android,
.unf-footer-background,
.unf-footer-ios {
  background-size: contain;
  background-repeat: no-repeat;
}
.footer {
    padding: 50px 0 20px 0;
    background-color: #232323;
    color: #fff;
}
.footer .title{
	text-align: left;
	color:#fff;
	text-transform: uppercase;
	font-size:15px;
}
.footer .social-icon{
	padding:0px;
	margin:0px;
}
.footer .social-icon a{
	display:inline-block;
	color:#fff;
	font-size:25px;
	padding:5px;
}
.footer .acount-icon a{
	display:block;
	color:#fff;
	font-size:18px;
	padding:5px;
	text-decoration:none;
}
.footer .acount-icon .fa{
	margin-right:25px;
}
.footer .category a {
    text-decoration: none;
    color: #fff;
    display: inline-block;
    padding: 5px 20px;
    margin: 1px;
    border-radius:4px;
    margin-top: 6px;
    background-color: black;
    border: solid 1px #fff;
}
.footer .payment{
	margin:0px;
	padding:0px;
	list-style-type:none
}
.footer .payment li{
	list-style-type:none
}
.footer .payment li a {
    text-decoration: none;
    display: inline-block;
    color: #fff;
    float: left;
    font-size: 25px;
    padding: 10px 10px;
}
</style>