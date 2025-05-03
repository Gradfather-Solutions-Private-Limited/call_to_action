<template>
<div class="col-md-12 mb-20">
   	<p class="text-Information text-center ">
		You'll receive a password reset code via email shortly. If you don't see it, please check your spam folder.
	</p>
   
	 <div class="form-group">
		<div class="extr_textbox5 t1-left">
			<label>E-mail Address</label>
		</div>
	</div> <!-- form-group// -->
	 <div class="input-group" style="margin-bottom:10px;">
  		<input type="text" v-model="email" class="form-control" placeholder="Enter e-mail address" >
	 </div> <!-- input-group.// -->
	 
	 <div class="form-group" v-if="otpenabled">
		<div class="extr_textbox5 t1-left">
			<label>OTP</label>
		</div>
	</div> <!-- form-group// -->
	  <div class="input-group" style="margin-bottom:10px;" v-if="otpenabled">
  		<input type="number" v-model="otp" class="form-control" placeholder="OTP" >
	 </div> <!-- input-group.// -->
	 
	 
	<div class="form-group">
        <button type="submit" v-if="otpenabled" @click="reset()" class="btn btn-primary btn-block col-md-12" style> Reset </button>
        <button type="submit" @click="triggerotp()" class="btn btn-primary btn-block col-md-12" style> Send OTP </button>
    </div>
     <div class="form-group">
		<div class="extr_textbox5 t1-left">
			<label>Need help</label> <a href="#">  retrieving a forgotten username/password? </a>
			
		</div>
	</div> <!-- form-group// -->
   </div>
</template>
<script>
import api from '../../lib/utils/Axios'
import Constants from '../utilities/Constants.vue'
export default {
	mixins:[Constants],
	data(){
		return {
			otpenabled:false,
			email:'',
			otp:''
		}
	},
	methods:{
		triggerotp(){
			let param = {email:this.email}
			api.post('auth/resetusingemail',param)
			.then(response=>this.processResponse(response.data))
			.catch(error=>console.log(error));
		},
		processResponse(data){
			if(data.status)
				this.otpenabled = true;
			
				
		},
		reset(){
			let param = {email:this.email,otp:this.otp}
			api.post('auth/verifyotponemail',param)
			.then(response=>this.processOTPResponse(response.data))
			.catch(error=>console.log(error));
		},
		processOTPResponse(data){
			console.log(data);
			if(data.status){
				window.location.href=this.prefixinurl('dashboard')
			}
		}
	}
	
}
</script>