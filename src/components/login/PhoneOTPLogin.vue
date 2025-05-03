<template>
<div>
<div class="form-group">
   		<div class="extr_textbox5 t1-left">
   			<label>Phone Number</label>
   		</div>
   		<div class="input-group">
    		<div class="input-group-prepend">
    		    <span class="input-group-text">+91</span>
    		</div>
    		 <input type="number" v-model="phNo" class="form-control" placeholder="Phone Number" @focus="displayError = false" >
   		 </div> <!-- input-group.// -->
   	</div> <!-- form-group// -->
   	
   	<button id="sign-in-button" class="btn btn-outline-danger m-top-20" @click="sendOtp">Get OTP</button>
   	
   	<div v-if="verifyotpdiv">
   		<input type="number" class="form-control " v-model="otp" placeholder="OTP"/>
   		<button @click="verifyOtp" class="btn btn-outline-danger">Verify</button><br>
   	</div>
   	<div v-if="resenddiv">
   		<button @click="sendOtp()">Resend OTP</button>
   	</div>
	   <div id="recaptcha-container"></div><br>
</div>
</template>
<script>
import api from '../../lib/utils/Axios'
//import firebase from 'firebase/app';
//import 'firebase/auth';
export default {
	data(){
      return{
        phNo: '',
        otp : '',
        verifyotpdiv:false,
        resenddiv:false,
        otplogin:true,
        password:'',
      }
    },
	methods:{
		sendOtp(){
        if(this.phNo.length != 10){
          alert('Invalid Phone Number Format !');
        }else{
          //
          let countryCode = '+91' //india
          let phoneNumber = countryCode + this.phNo
          //
          let appVerifier = this.appVerifier
          //
      	let self = this;
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              self.verifyotpdiv = true;
              
              setTimeout(()=>{
            	  self.resenddiv = true;
                },1000);
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
            console.log(error);
            alert('Error ! SMS not sent')
          });
        }
      },
      //
      verifyOtp(){
        if(this.phNo.length != 10 || this.otp.length != 6){
          alert('Invalid Phone Number/OTP Format !');
        }else{
          //
          let vm = this
          let code = this.otp
          var credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code);
          firebase.auth().signInWithCredential(credential).then(function(result){
        	  
        	  result.user.getIdToken().then(function(idToken) {  // <------ Check this line
        		  let param = {firebasetoken:idToken};
                  api.post('api/firebasesignup',param)
      				.then(response=>vm.parent().processResponse(response.data))
      				.catch(error=>console.log(error));
               });
        	  
          });
          
        }
      },
	  initReCaptcha(){
        setTimeout(()=>{
          
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function() {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            'expired-callback': function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          });
          //
          this.appVerifier =  window.recaptchaVerifier
        },1000)
      },
      initFirebase(){
		  if (!firebase.apps.length) {
   

			firebase.initializeApp({
				apiKey: "AIzaSyDKaBxtiI-YGt29SvYpeilzt1s5Px4RXh4",
				authDomain: "vanshavali-8a1eb.firebaseapp.com",
				databaseURL: "https://vanshavali-8a1eb.firebaseio.com",
				projectId: "vanshavali-8a1eb",
				storageBucket: "vanshavali-8a1eb.appspot.com",
				messagingSenderId: "810419456760",
				appId: "1:810419456760:web:d3f46dcfdbb128078ac90d",
				measurementId: "G-4VRSQ2Q9K5"
			});
          }else {
   			firebase.app(); // if already initialized, use that one
}
        },
    },
    created(){

    this.initFirebase()
      this.initReCaptcha()
    },
	
}
</script>