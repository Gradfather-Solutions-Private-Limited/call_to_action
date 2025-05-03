<template>
<div>
	<section class="ftco-section">
        <div class="container">
            <!-- <div class="row justify-content-center">
                <div class="col-md-6 text-center.m-bottom-5">
                    <h2 class="heading-section">Welcome Admin Panel</h2>
                </div>
            </div> -->
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <img src="../../assets/login.jpg" class="img" alt="">
                        <div class="login-wrap p-md-5">
                            <div class="d-flex">
                                <div class="w-100 text-center">
                                    <h3 class="">Log In</h3>
                                </div>
                                <!-- <div class="w-100">
                                    <p class="social-media d-flex justify-content-end">
                                        <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-facebook"></span></a>
                                        <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-twitter"></span></a>
                                    </p>
                                </div> -->
                            </div>
                            <form action="#" class="signin-form">
                               
                                <div class="">
                                    <span style="position: relative;top: 45px;left: 44%;"><i class='bx bxs-user' style="font-size: 30px;"></i></span>
                                    <!-- <label class="label" for="name">Username</label> -->
                                    <input type="text" class="form-control" v-model="email" placeholder="Username" required>
                                </div>
                                
                                <div class="form-group m-bottom-3">
                                   <span style="position: relative;top: 40px;left: 43%;"> <img src="../../assets/password.png" style="width: 30px;"></span>
                                    <!-- <label class="label" for="password">Password</label> -->
                                    <input type="password" class="form-control" v-model="password" placeholder="Password" required>
                                </div>
                                <div class="form-group">
                                    <button type="button" @click="loginwithemailpassword()" class="form-control btn btn-primary rounded submit px-3">Log In</button>
                                </div>
                                <!-- <div class="form-group d-md-flex">
                                    <div class="w-50 text-left">
                                        <label class="checkbox-wrap checkbox-primary.m-bottom-0">Remember Me
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="w-50 text-md-right">
                                        <a href="#">Forgot Password</a>
                                    </div>
                                </div> -->
                            </form>
                            <!-- <p class="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</section>
</div>
</template>
<script>
import api from '../../lib/utils/Axios'
export default {
    data(){
      return{
        email:'',
        password:'',
      }
    },
    mounted(){
        console.log(localStorage.getItem('token'));
        localStorage.setItem("countstore", 0);
    },
    methods:{
        loginwithemailpassword(){
            
            // this.$store.commit('assignloadingstatus',1)
            let param = {email:this.email,password:this.password}
    		axios.post('api/loginwithemailpassword',param)
				.then(response=>this.$parent.processResponse(response.data))                
				.catch(error=>console.log(error));
    	},
	}
}
</script>
<style scoped>

.container {
    max-width: 1140px;
}
.heading-section {
    font-size: 28px;
    color: #000;
}
.wrap {
    width: 100%;
    overflow: hidden;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
    -moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
    box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
}
.img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.img, .login-wrap {
    width: 50%;
}
.login-wrap {
    position: relative;
    background: #fff h3;
    background-font-weight: 300;
}
.w-100 {
    width: 100% !important;
}
.social-media {
    position: relative;
    width: 100%;
}
.social-media .social-icon {
    display: block;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 16px;
    margin-right: 5px;
    border-radius: 50%;
}
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
.social-media .social-icon span {
    color: #999999;
}
.social-media .social-icon {
    display: block;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 16px;
    margin-right: 5px;
    border-radius: 50%;
}
.form-group .label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    font-weight: 700;
}
.form-control {
    height: 48px;
    background: #fff;
    color: #000;
    font-size: 16px;
    border-radius: 5px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
.btn.btn-primary {
    background: #de4659 !important;
    border: 1px solid #de4659 !important;
    color: #fff !important;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
}
.btn.btn-primary:hover {
    box-shadow: 0px 3px 9px gray;
}
.text-left {
    text-align: left !important;
}
.w-50 {
    width: 50% !important;
}
.checkbox-wrap {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.checkbox-primary {
    color: #e3b04b;
}
.m-bottom-0, .my-0 {
    margin-bottom: 0 !important;
}
.checkbox-wrap input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
input[type="radio"], input[type="checkbox"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
}
.p-md-5 {
    padding: 3rem !important;
}
.p-4 {
    padding: 1.5rem !important;
}
@media (min-width: 768px){
.d-md-flex {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    }
}
.social-media .social-icon:hover, .social-media .social-icon:focus {
    background: #e3b04b;
    color:white;
    transition: .3s all ease;
}
a:hover, a:focus {
    text-decoration: none !important;
    outline: none !important;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.m-bottom-4, .my-4 {
    margin-bottom: 1.5rem !important;
}
.d-flex {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
}
.justify-content-end {
    -webkit-box-pack: end !important;
    -ms-flex-pack: end !important;
    justify-content: flex-end !important;
}
.m-bottom-5, .my-5 {
    margin-bottom: 3.5rem !important;
}
.justify-content-center {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
}
.social-media .social-icon:hover span, .social-media .social-icon:focus span {
    color: #fff;
}
a {
    -webkit-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
    color: #e3b04b;
}
.row {
    margin-right: -15px;
    margin-left: -15px;
}
a:hover {
    color: #0056b3;
    text-decoration: underline;
}
.form-group a {
    color: gray;
}
@media (max-width: 767.98px){
	.wrap .img {
		height: 250px;
	}
}
@media (max-width: 991.98px){
	.img, .login-wrap {
		width: 100%;
	}
}

</style>