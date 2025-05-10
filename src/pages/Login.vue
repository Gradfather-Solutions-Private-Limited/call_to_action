<template>
<div class="col-md-12">
	<!--<div class="col-md-12">
		<img alt="" src="images/logo.png" style="width: 14%;">
	</div>-->
	<div class="login-box" >
	<!--	<h1><i class="fa fa-bookmark"></i>&nbsp;Welcome </h1>
		<h5>Billing Vite Login</h5>-->
		<div class="input-box">
			<div class="row">
				<div class="col-md-12">
					<!--<phone-otp-login v-if="logintype==1"></phone-otp-login>
					<phone-password-login v-if="logintype==2"></phone-password-login>
					<forgot-password v-if="logintype==5"></forgot-password>-->
					<div v-if="displayError">{{ message }}</div>
					<email-password-login ></email-password-login>
					<div class="col-12" v-if="false">
						<div class="row">
							<div class="col-md-12 m-top-20">
								<button @click="changelogintype(1)"  type="button"  v-if="logintype!=1" class="btn btn-block btn-outline-warning extr_textbox4">
								<i class="fa fa-mobile"></i>
								
								Login with Mobile and OTP</button>
							</div>
							
							<div class="col-md-12 m-top-20">
								<button @click="changelogintype(2)"  type="button" v-if="logintype!=2" class="btn btn-block btn-outline-info extr_textbox4">
								<i class="fa fa-mobile"></i>
								Login with Mobile and Password</button>
							</div>
							
							<div class="col-md-12 m-top-20">
								<button @click="changelogintype(3)"  type="button" v-if="logintype!=3" class="btn btn-block btn-outline-primary extr_textbox4">
								<i class="fa fa-envelope"></i>
								Login with Email and Password</button>
							</div>
							<div class="col-md-12 m-top-20">
								<a href="#" @click="changelogintype(4)" v-if="logintype!=4">Register</a>
							</div>
							<div class="col-md-12 m-top-20" v-if="false">
								<button @click="modify()"  type="button"  class="btn btn-block btn-outline-primary extr_textbox4">
								<i class="fa fa-mobile"></i>
								Forget Password
								</button>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
    

</div>
</template>

<script>
import EmailPasswordLogin from '../components/login/EmailPasswordLogin.vue';
import Ls from '../lib/utils/Ls'
  export default {
	  name:'login',
	  components: {
		 EmailPasswordLogin
	  },
    data(){
      return{
        phNo: '',
        email:'',
        appVerifier : '',
        otp :'',																																																																																									
        verifyotpdiv:false,
        resenddiv:false,
        logintogglestring:"Login with Password",
        otplogin:true,
        password:'',
        message:'',
        loginpop:1,
        displayError:false,
        loginstus:0,
        buttonstatus:1
      }
    },
    computed:{
    	logintype(){
    		return this.$store.state.viewno;
    	}
    },
    mounted(){
    },
    methods :{
    
    	modify(){
			this.$modal.show("forgetpassword");
		},
		hidescreen(){
			this.loginstus=1;
			this.buttonstatus=0;
			this.$store.commit('assignviewno',5)
			
		},
		cancel(){
			this.$store.commit('assignviewno',3)
			this.buttonstatus=1;
			this.loginstus=0;
		},
    	
    	changelogintype(type1){
    		this.loginpop = 1;
    		if(type1 == 4){
    			this.loginpop = 0;
    		}
    		this.$store.commit('assignviewno',type1)
    		
    	},
    	logintoggle(){
    		if(this.otplogin){
    			this.otplogin = false;
    			this.logintogglestring = "Login with OTP";
    		} else {
    			this.otplogin = true;
    			this.logintogglestring = "Login with Password";
    		}
    	},
		processResponse(data){
            if(data.success){
				Ls.set('token',data.access_token)
				Ls.set('user',data.user)
				this.$store.commit('assignloggedinuser',data.user)
				console.log(data.user)
				this.$router.push({path:"/patientmanager"})
				// this.$store.commit('assignloadingstatus',0)
			} else {
				this.displayError = true;
                this.message = "Email/Password Not Correct"
				// this.$store.commit('assignloadingstatus',0)
            }
      	},
      
    
    
  }
}

</script>