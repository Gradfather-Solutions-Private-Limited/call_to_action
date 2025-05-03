<template>
    <div>

        <left-navigation2></left-navigation2>
        <section class="home-section">
            <div class="home-content">
                <div class="container-fluid">
                    <div class="row justify-content-between">
                        <div class="col-9 col-md-4 d-flex align-items-center">
                            <i class='bx bx-menu' @click="addEventListener()"></i>
                            <span class="card-title cust-font">{{this.addpageheading }}</span>
                        </div>
                        <div class="col-3 col-md-8">
                            <div class="navbar-container">
                                <div class="nav-item">
                                    <i class='bx bxs-shield'></i> SESSION : 2024-2025
                                </div>
                                <div class="nav-item">
                                    <i class='bx bx-book'></i> DAY BOOK
                                </div>
                                <div class="nav-item">
                                    <i class='bx bx-money'></i> CASH BOOK
                                </div>
                                <div class="nav-item">
                                    <i class='bx bx-line-chart'></i> VOUCHER ENTRIES
                                </div>
                                <div class="nav-item profile">
                                    <i class='bx bxs-user-circle'></i> 
                                    {{ loggedinuser?.name }}
                                    
                                </div>
                                <div class="nav-item logout" @click="logout()">
                                    <i class='bx bx-power-off' style="color:#fff"></i>
                                </div>
                            </div>
                            <!-- <ul class="top-right-menu">
                                <li>
                                    <i class='bx bx-plus'></i>

                                </li>
                                <li>
                                    <img src="../assets/avatar-1.jpg" alt="User Avatar" width="35" height="35"
                                        style="border-radius: 50%;" />
                                    <span class="loggedinusercss">{{ loggedinuser?.name }}</span>
                                </li>
                            </ul> -->
                            <!-- <i class='bx bx-user' style="font-size: 25px;"></i> -->
                            <!-- <span class="logo_name" style="font-size: 25px;font-weight: 600;margin: 0px 20px;">{{loggedinuser?.name}}</span> -->
                            <!-- <button class="logout" @click="logout()">Logout</button> -->
                        </div>

                    </div>
                </div>

                <span class="text"></span>
            </div>
            <router-view />
        </section>

    </div>
</template>
<script>
import LeftNavigation from './LeftNavigation.vue';
import LeftNavigation2 from './LeftNavigation2.vue';
import { mapGetters } from 'vuex'
import LoadingImage from '../components/utilities/LoadingImage.vue';
import TopHeadbar from './TopHeadbar.vue';
//'./components/utilities/LoadingImage.vue'
export default {
    components: { LoadingImage, LeftNavigation, LeftNavigation2, TopHeadbar },
    data() {
        return {
            leftDrawerOpen: false
        }
    },
    mounted() {
        // window.addEventListener('click', this.windowresize);
        this.windowresize();
    },
    computed: {
        ...mapGetters([
            'addpageheading', 'loggedinuser'
        ]),
    },
    methods: {
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },
        truncateText(text, length) {
            return text.length > length ? text.substring(0, length) + "..." : text;
        },
        windowresize() {
            if (window.innerWidth >= 760) {
                this.addEventListener();
            }
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

<style>
.navbar-container {
    display: flex;
    align-items: center;
    background: white;
    padding: 0px;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 0px 9px;
    font-size: 12px;
    font-weight: 500;
    color: #333;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.nav-item:last-child {
    border-right: none;
}

.nav-item i {
    font-size: 20px;
    margin-right: 8px;
    color: #007483;
}

.profile {
    margin-left: auto;
}

.logout {
    background: red;
    color: white;
    padding: 10px;
    border-radius: 4px;
}
</style>