<template>
    <div id="newsidebar" class="sidebar close">
        <div class="logo-details">
            <img src='../assets/logo-sm.png' class="adjustImage" alt="logo" />
            <span class="logo_name">Finance System</span>
        </div>
        <ul class="nav-links">
            <li>
                <span class="left-menu-text">MENU</span>
            </li>

            <li>
                <router-link to="/dashboard">
                    <i class='bx bx-tachometer'></i>
                    <span class="link_name">Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/users">
                    <i class='bx bx-user'></i>
                    <span class="link_name">User form</span>
                </router-link>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#" class="icon-set">
                        <i class='bx bx-list-ul'></i>
                        <span class="link_name ">Loan</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li class="nav-menu">
                        <router-link to="/loan-form">
                            <i class='bx bx-right-arrow-alt'></i>
                            <span class="titlesize">Loan Form</span>
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/loan-accounts">
                            <i class='bx bx-right-arrow-alt'></i>
                            <span class="titlesize">Loan Accounts</span>
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/loanLedgers">
                            <i class='bx bx-right-arrow-alt'></i>
                            <span class="titlesize">Loan Ledgers</span>
                        </router-link>
                    </li>

                </ul>
            </li>
            <li>
                <router-link to="/user-type-ledgers">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Ledgers</span>
                </router-link>
            </li>
            <li>
                <router-link to="/all-enach">
                    <i class='bx bx-user'></i>
                    <span class="link_name">All ENach</span>
                </router-link>
            </li>
            <li>
                <router-link to="/registers">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Registers</span>
                </router-link>
            </li>
            <li>
                <div class="iocn-link">
                    <a href="#" class="icon-set">
                        <i class='bx bx-list-ul'></i>
                        <span class="link_name ">Report</span>
                    </a>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li class="nav-menu">
                        <router-link to="/schedule-emis">
                            <i class='bx bx-right-arrow-alt'></i>
                            <span class="titlesize">Schedule Emi </span>
                        </router-link>
                    </li>
                </ul>
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
                        <div class="job">@ Copyright GFS Solutions Pvt Ltd</div>
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