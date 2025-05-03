
<template>
<div>
  <!--<top-headbar/>
  <left-navigation/>
  <div class="content home-section" id="main" >
    <loading-image/>
    <notifications position="top right" />-->
    <loading-image/>
    <Notification />
    <router-view></router-view>

</div>
</template>
<script>
import LoadingImage from './components/utilities/LoadingImage.vue'
import Notification from "./pages/Notification.vue";
export default {
  components: {LoadingImage,Notification}
 }

</script>
<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
