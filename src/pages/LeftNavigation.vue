<template>
<div>
	<div class="sidebar" :class={sidewidth:isactive}>
      <!-- <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img> -->
        
      <ul class="nav-list" style="padding-left: 0%;">
          <div class="flex-row nav-header">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" class="nav-avatar" alt="" width="50" height="50">
              <div class="navigation-header">{{loggedinuser?.name}}</div>
          </div>
          <li v-if="accessid(254)">
              <router-link to="/dashboard" >
                  <i class="bx bx-grid-alt">
                       <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                  </i>
                  <span :class="{links_name:!isactive}">Dashboard</span>
              </router-link>
          </li>
          <li v-if="accessid(269)">
              <router-link to="/company" >
                  <i class="bx bx-grid-alt">
                       <q-tooltip>
                        Company
                      </q-tooltip>
                  </i>
                  <span :class="{links_name:!isactive}">Company</span>
              </router-link>
          </li>
          <li v-if="accessid(201)">
              <router-link to="/homepage" >
                  <i class='bx bxs-duplicate'></i>
                  <span :class="{links_name:!isactive}">Home Page</span>
              </router-link>
          </li>
          <li v-if="accessid(202)">
            <router-link to="/vendorlist" >
                  <i class='bx bxs-duplicate'></i>
                  <span :class="{links_name_menu:!isactive}">Vendors List</span>
              </router-link>
          </li>
          <li v-if="accessid(204)">
              <router-link to="/categories" >
                  <i class='bx bxs-duplicate'></i>
                  <span :class="{links_name:!isactive}">Categories</span>
              </router-link>
          </li>
          
          <li v-if="accessid(205)">
              <router-link to="/banners" >
                  <i class='bx bx-image' ></i>
                  <span :class="{links_name:!isactive}">Banners</span>
              </router-link>
          </li>
          <li v-if="accessid(206)">
              <q-expansion-item group="somegroup" icon="category" label="Products" class="nav-font"  :header-class="headerclass" >
              <ul class="nav-list" style="padding-left: 0%;"> 
                  <li class="nav-menu" v-if="accessid(206)">
                      <router-link to="/products" >
                          <i class='bx bxl-product-hunt nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Products</span>
                      </router-link>
                  </li>
                  <!-- <q-seperator /> -->
                  <li class="nav-menu"  v-if="accessid(207)">
                      <router-link to="/attributes" >
                          <i class='bx bx-pyramid nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Attributes</span>
                      </router-link>
                  </li>
                  <li class="nav-menu" v-if="accessid(208)">
                      <router-link to="/addcommonproducts" >
                          <i class='bx bx-pyramid nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Set Common Attributes</span>
                      </router-link>
                  </li>
                  <!-- <li class="nav-menu">
                      <router-link to="/commonproducts" >
                          <i class='bx bx-pyramid nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Common Attributes</span>
                      </router-link>
                  </li> -->
              </ul> 
              </q-expansion-item>
          </li>
          <li v-if="accessid(209)">
              <q-expansion-item  group="somegroup" icon="shopping_cart" label="Orders" :header-class="headerclass" class="nav-font" expand-icon-class="q-pa-none">
                <ul class="nav-list" style="padding-left: 0%;"> 
                    <li class="nav-menu" v-if="accessid(209)">
                        <router-link to="/orderlist" >
                            <i class='bx bxs-shopping-bag-alt nav-menu-icon' ></i>
                            <span :class="{links_name_menu:!isactive}">Orders</span>
                        </router-link>
                    </li>
                    <!-- <q-seperator /> -->
                    <li class="nav-menu" v-if="accessid(210)">
                        <router-link to="#" >
                            <i class='bx bx-pyramid nav-menu-icon' ></i>
                            <span :class="{links_name_menu:!isactive}">Try N Buy</span>
                        </router-link>
                    </li>
                </ul> 
              </q-expansion-item>
          </li>
          <li v-if="accessid(211)" >
              <router-link to="/templates" >
                  <i class='bx bx-image' ></i>
                  <span :class="{links_name:!isactive}">Templates</span>
              </router-link>
          </li>
          <li>
              <router-link to="/template/blogspot" >
                  <i class='bx bx-image' ></i>
                  <span :class="{links_name:!isactive}">Blogs Post</span>
              </router-link>
          </li>
          
          <li v-if="accessid(213)">
              <router-link to="/poems" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Poems</span>
              </router-link>
          </li>
          <li v-if="accessid(214)">
              <router-link to="/poem/schedule" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Poem Schedule</span>
              </router-link>
          </li>
          <li v-if="accessid(215)">
              <router-link to="/users" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Users</span>
              </router-link>
          </li>
          <li v-if="accessid(216)">
              <router-link to="/usersaccess" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Users Access</span>
              </router-link>
          </li>
          <li v-if="accessid(229)">
              <q-expansion-item group="somegroup" icon="category" label="Summary" class="nav-font"  :header-class="headerclass" >
              <ul class="nav-list" style="padding-left: 0%;"> 
                  <li class="nav-menu" v-if="accessid(230)">
                      <router-link to="/poem/dealer/summary" >
                          <i class='bx bx-grid-alt nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Dealer Summary</span>
                      </router-link>
                  </li>
                  <!-- <q-seperator /> -->
                  <li class="nav-menu" v-if="accessid(231)">
                      <router-link to="/poem/company/summary" >
                          <i class='bx bx-grid-alt nav-menu-icon' ></i>
                          <span :class="{links_name_menu:!isactive}">Company Summary</span>
                      </router-link>
                  </li>
              </ul> 
              </q-expansion-item>
          </li>
          <li v-if="accessid(232)">
              <router-link to="/poem/schedule/dealers" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Dealers</span>
              </router-link>
          </li>
          <li v-if="accessid(267)">
              <router-link to="/commission" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Commission</span>
              </router-link>
          </li>
          <li v-if="accessid(268)">
              <q-expansion-item group="somegroup" icon="send" label="WhatsApp" class="nav-font"  :header-class="headerclass" >
                <ul class="nav-list" style="padding-left: 0%;"> 
                    <li class="nav-menu">
                        <router-link to="/wattsapp/templates" >
                            <i class='bx bxl-whatsapp'></i>
                            <span :class="{links_name:!isactive}">WhatsApp Templates</span>
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/gallery" >
                            <i class='bx bxl-whatsapp'></i>
                            <span :class="{links_name:!isactive}">Whats App Gallery</span>
                        </router-link>
                    </li>
                </ul> 
              </q-expansion-item>
          </li>
          <!-- <li v-if="accessid(268)">
              <router-link to="/wattsapp/templates" >
                 <i class='bx bxl-whatsapp'></i>
                  <span :class="{links_name:!isactive}">WhatsApp Templates</span>
              </router-link>
          </li> -->
          <li v-if="accessid(233)">
              <router-link to="/poem/draw" >
                  <i class="bx bx-grid-alt">
                       
                  </i>
                  <span :class="{links_name:!isactive}">Poem Draw</span>
              </router-link>
          </li>
          <li >
              <router-link to="/seo/navigation" >
                  <i class='bx bx-log-out'></i>
                  <span>SEO Navigation list</span>
              </router-link>
          </li>
          <li  @click="logout()" >
              <router-link to="" >
                  <i class='bx bx-log-out'></i>
                  <span :class="{links_name:!isactive}">Log Out</span>
              </router-link>
          </li>
      </ul>
  </div>

</div>
</template>
<script>
import { mapGetters } from "vuex";
import Constants from "../components/access/Constants.vue";
export default {
  name: "navbar",
  mixins:[Constants],
  components:{},
  data() {
    return {
        isactive:false,
        icon:"iconshow",
        showMenu:false,
        headerclass:['text-white','nav-font']
        
    }
  },
  computed: {
    ...mapGetters(["loggedinuser"]),
  },
mounted() {
this.$store.dispatch("getloggedinuser")
console.log("loggedinuser")
console.log(this.loggedinuser)
},

  methods: {
     logout(){
          
          localStorage.removeItem("token");
           this.$router.push({name:'login'})
        }
  },

};
</script>
<style scoped>
.q-item__section--avatar {
  min-width: 42px !important;
}
.nav-font{
  font-size:18px;
  font-family:Bitter;
}
.sidewidth{
  width:17%;
}
.q-item{
    font-family:Bitter;
    padding: 4px 11px !important;
}
.links_name{
  opacity: 10;
  pointer-events: auto;
   color: #fff;
    font-size: 17px;
    font-weight: 400;
    white-space: nowrap;
    pointer-events: none;
    padding-left: 13px;
}
.links_name_menu{
  opacity: 10;
  pointer-events: auto;
   color: rgb(247, 247, 247);
    font-size: 17px;
    font-weight: 400;
    white-space: nowrap;
    pointer-events: none;
}
.sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    background: transparent;
    justify-content: left;
    color: white;
    padding: 8px 12px;
    font-family:Bitter;
}
.sidebar li {
    position: relative;
    list-style: none;
    border-bottom: 1px solid #002e4e;
    background-image: linear-gradient(#003a63, #002844)
}
.sidebar li a i{
    font-size: 24px;
    margin-right: 22px;
    
}
.nav-menu{
  background-color: aliceblue;
  
}
.nav-menu:hover{
  background-color: #e5e5e5;
  color:white;
}
.nav-avatar{
  border-radius: 50%;
}
.nav-menu-icon{
  color: rgb(247, 247, 247);
}
.a:hover{
  text-decoration: none;
}
.nav-header{
    height: 100px;
    /* background-image: url(https://cdn.quasar.dev/img/material.png); */
    background-color: #245578;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom: 1px solid #f6f6f6;
}
</style>