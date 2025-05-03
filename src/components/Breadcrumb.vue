<template>
    <div class="mt-10">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">{{ pagename}}</h4>
                    </div>
                    <div class="col-md-2 text-right">
                        <button v-on="on" class="btn" @click="backBtn()">
                            <i class='bx bx-refresh' style="font-size:30px"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        props:['pagename'],
        data(){
            return {
                message: 'Hello Vue.js!',
                showMessage: true
            }
        }
    }
</script>