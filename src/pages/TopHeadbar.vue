<template>
	<div>
		<div id="mySidenav" class="sidenav">
		<a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
		<a href="#">About</a>
		<a href="#">Services</a>
		<a href="#">Clients</a>
		<a href="#">Contact</a>
		</div>
	</div>
	<nav class="navbar" style="background-color:#333d5f;">
		<div id="main">
		<h2>Sidenav Push Example</h2>
		<p>Click on the element below to open the side navigation menu, and push this content to the right.</p>
		<span style="font-size:30px;cursor:pointer" @click="openNav()">&#9776; open</span>
		</div>

		<div class="container-fluid" style="margin-left:6%">
			<div class="navbar-header">
			
			</div>
			<div class="collapse navbar-collapse" id="myNavbar" v-if="loginusercheck(52) && loggedinuser.role==3 ">
				
				<ul  class="nav navbar-nav navbar-right" >
					
						
							<!-- <li v-if="loginusercheck(83)" @click="openform()"><a href="#" ><i class='bx bxs-building-house'  style="font-size:17px;color:#ed2e2e;">  Add Company</i></a></li>
							<li v-if="loginusercheck(84)" @click="openlist()"><a href="#" ><i class='bx bxs-building-house'  style="font-size:17px;color:#ed2e2e;"> Company lists</i></a></li>
							<hr style="margin:5px">
							<li>Access</li>
							<li v-if="loginusercheck(51)">
								<router-link to="access" href="#">
									<i class='bx bxs-cog'  style="font-size:17px;color:#ed2e2e;"></i> Manage User Access
								</router-link>
							</li> -->
							<li>
								<router-link to="masteraccess" href="#">
									<i class='bx bxs-face-mask'  style="font-size:17px;color:#ed2e2e; "></i> Manage Company Access
								</router-link>
							</li>
						
					
				</ul>
				<!--Master User Access-->
				
				<!---Master----->
				<ul v-if="loginusercheck(100)" class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<!-- <w-tooltip color="white" bg-color="red" v-if="loginusercheck(100)">
							<template #activator="{ on }">
								<router-link to="master" href="#" v-on="on">
							<i class='bx bx-heart'  style="font-size:24px;color:white;"></i>
						</router-link>
							</template>
							Master
						</w-tooltip> -->
					</li>
				</ul>
				<!-----Product Manufacturer------>
				
				
			</div>
		</div>
	</nav>
			<!--	<div class="col-md-8">
                    <div class="row">
						 <div class="col-md-1"></div>
                         <div class="col-md-3">
                                <select-date></select-date>
                         </div>
                         <div class="col-md-2">
                               <select-store></select-store>
                         </div>
						 <div class="col-md-2" v-if="viewno==2">
                               <invoice-selector></invoice-selector>
                         </div>
						 <div class="col-md-4" v-if="viewno==18 || viewno==19">
                               <select-store2></select-store2>
                         </div>
                    </div>
					
				</div>
				<div class="col-md-4">
					 <div class="row pt-10" style="float:right">
						<div class="col-md-1" style="float:right;">
							<i class="fa fa-envelope" style="font-size:18px"></i>
						</div>
						<div class="col-md-1">
							<i class="fa fa-bell" style="font-size:18px"></i>
						</div>
                        <div class="col-md-1">
                              <div class="dropdown" @click="open()" style="background-color:none;">
								<div class="spinner-border" role="status">  
									<i class='bx bxs-user'  style="font-size:24px;color:white;"></i>
								</div>
								<ul class="dropdown-menu" v-if="show" v-bind:class={show:isactive}>
								<li style="font-size:12px;"><a href="#">Login</a></li>
								<li style="font-size:12px;"><a href="#">Logout</a></li>
								<li style="font-size:12px;"><a href="#">Setting</a></li>
								<li style="font-size:12px;"><a href="#"><i class="fa fa-user"></i>My Account</a></li>
								</ul>
							</div>
  						</div>
						<div class="col-md-1" style="padding-left:15px;">
							<p>gBilling</p>
						</div>
                       	
                    </div>
				</div>-->
			
</template>
<script>
import { mapGetters } from 'vuex'
//import Ls from '@src/lib/utils/Ls'
import Constants from '../components/access/Constants.vue'
export default {
	mixins:[Constants],
	components:{},
	data() {
		return {
			show:false,
			isactive:"droplist",
			show1:false,
			show2:false,
		}
	},
	computed:{
		...mapGetters([
			'viewno','trantype','loggedinuser','openDrawer'
		]),
		position () {
			 return this.openDrawer || 'left'
		}

	},
	mounted() {
		this.$store.dispatch("getloggedinuser")
	},
	methods: {
		opensidenav(){
			this.$store.commit("assignopenDrawer",true)
		},
		closeNav(){

		},
		logout(){
			Ls.remove("user")
			Ls.remove("token")
		},
		openNav(){
			document.getElementById("mySidenav").style.width = "250px";
		},
		open(){
			this.show=!this.show
		},
		open1(){
			this.show1=!this.show1
		},
		open2(){
			this.show2=!this.show2
		},
			edituser(item){
			this.$store.commit("assignedititem",item)
			//this.$store.commit("assigneditview",true)
			this.$store.commit("assigncustomereditview",true)
			this.$router.push({name:'companyform'})
		},
		openform(){
			this.$store.commit("assignedititem",null)
			this.$store.commit("assignselectedaddress",null)
			this.$store.commit("assignaddressess",null)
			this.$router.push({name:'companyform'})
		},
		openlist(){
			this.$router.push({name:'companylist'})
		},
		editloggedinuser(item){
			if(this.loggedinuser.iscompany=="1"){
				this.$store.commit("assignedititem",item)
				this.$router.push({name:'companyform'})
			}else{
				this.$store.commit("assignedititem",item)
				this.$router.push({name:'customermodify'})
			}
		}
	},
}
</script>
<style scoped>
.droplist{
	display: block;
	list-style-type: style hover; 
}
.dropdown-menu li a:hover{
	background-color: bisque;
	font-size: 14px;
}
.dropdown-menu li a{
	font-size: 14px;
	font-weight: 700;
}

.nav .open>a, .nav .open>a:focus, .nav .open>a:hover {
    background-color:transparent;
    border-color: transparent;
	cursor: pointer;
}
</style>
