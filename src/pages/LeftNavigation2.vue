<template>
    <div id="newsidebar" class="sidebar close">
        <!-- <div class="logo-details">
            <img src='../assets/logo-sm.png' class="adjustImage" alt="logo" />
            <span class="logo_name">Finance System</span>
        </div> -->
        <ul class="nav-links">
            <li>
                <span class="left-menu-text">MENU</span>
            </li>
            <li v-if="accessid(421)">
                <router-link to="/patientmanager">
                    <i class='bx bx-user-plus'></i>
                    <span class="link_name">Patient</span>
                </router-link>
            </li>
            <li  v-if="accessid(422)">
                <router-link to="/institute">
                    <i class='bx bx-buildings'></i>
                    <span class="link_name">Institute</span>
                </router-link>
            </li>
            <li v-if="accessid(423)">
                <router-link to="/hospitalmanager">
                    <i class='bx bx-plus-medical'></i>
                    <span class="link_name">Nursing Home</span>
                </router-link>
            </li>
            <li v-if="accessid(424)">
                <router-link to="/studentmanager">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Students</span>
                </router-link>
            </li>
            <li  v-if="accessid(425)">
                <router-link to="/mobilizermanager">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Mobilizer</span>
                </router-link>
            </li>
             <li v-if="accessid(426)">
                <router-link to="/employee">
                    <i class="bx bx-user" ></i>
                    <span class="link_name">Employee</span>
                </router-link>
            </li>
            <li v-if="loggedinuser?.role>1">
                <router-link to="/access">
                    <i class='bx bx-setting'></i> 
                    <span class="link_name">Permission</span>
                </router-link>
            </li>
            <li>
                <router-link to="logout" @click="logout()">
                    <i class='bx bx-log-out-circle'></i>
                    <span class="link_name">Logout</span>
                </router-link>
            </li>


            <li>
                <div class="profile-details">
                    <!-- <div class="profile-content">
                        <img src="image/profile.jpg" alt="profileImg">
                    </div> -->
                    <div class="name-job pl-5">
                        <div class="profile_name">{{ loggedinuser?.name }}</div>
                        <!-- <div class="job">@ Copyright GFS Solutions Pvt Ltd</div> -->
                    </div>
                    <!-- <i class='bx bx-log-out' style="color: #fff;" @click="logout()"></i> -->
                </div>
            </li>
        </ul>
    </div>

</template>
<script>
import { mapGetters } from "vuex";
import Constants from "../components/access/Constants.vue";
export default {
    name: "navbar",
    mixins: [Constants],
    components: {},
    data() {
        return {
            isactive: false,
            icon: "iconshow",
            showMenu: false,
            headerclass: ['text-white', 'nav-font']
        }
    },
    computed: {
        ...mapGetters(["loggedinuser"]),
    },
    mounted() {
        this.$store.dispatch("getloggedinuser")
        this.$store.dispatch("fetchmaster");
        this.navSubMenuScript();
    },
    methods: {
        navSubMenuScript() {
            setTimeout(() => {
                let arrow = document.querySelectorAll(".arrow");
                console.log('arrow');
                console.log(arrow);
                for (var i = 0; i < arrow.length; i++) {
                    arrow[i].addEventListener("click", (e) => {
                        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
                        arrowParent.classList.toggle("showMenu");
                    });
                }
            }, 1000);
        },
        addEventListener() {
            var element = document.getElementById("newsidebar");
            element.classList.toggle("close");
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: 'login' })
        }
    },
}

</script>
<style scoped>
.sidebar .logo-details .adjustImage {
    width: 30%
}

.sidebar.close .logo-details .adjustImage {
    width: 90%
}
</style>