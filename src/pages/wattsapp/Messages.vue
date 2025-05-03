<template>
    <div class="col-md-12" v-if="selectedthread != null">
        <div>
            <div>
                <div class="border_bottom">
                    <div class="flex-align-center-start">
                        <div class="p1020">
                            <div class="first_letter">
                                <span v-if="this.selectedthread?.user2obj != null">
                                    {{ this.selectedthread?.user2obj?.name.charAt(0) }}
                                </span>
                                <span v-else><i class='bx bx-user'></i></span>
                            </div>

                        </div>
                        <div>
                            <div>
                                <h5 class="m0px">{{ this.selectedthread?.user2obj != null ?
                                    this.selectedthread?.user2obj?.name : this.selectedthread?.usermobile2 }}</h5>
                            </div>
                            <!-- <div>
                                <p style="margin-bottom:0;font-size: 12px;">
                                    Online
                                </p>
                            </div> -->
                        </div>
                    </div>
                    <!-- <h3 style="padding: 10px 15px;">Message</h3> -->
                </div>
            </div>
            <div class="chat_bg" id="chat-message">
                <div>
                    <ul>
                        <li :class="checksenderuser(item)" v-for="(item) in messages">
                            <div v-if="item.messagetext != null && item.messagetext != ''">
                                <div class="message_content">
                                    <p class="m0px">{{ item.messagetext }}</p>
                                </div>
                            </div>
                            <div v-if="item.bodytext != null && item.bodytext != ''">
                                <div class="image_content" v-if="getUrl(item) != '' ? true : false">
                                    <div>
                                        <img :src="getUrl(item)" @load="handleLoad"
                                            style="width: 100%;height: 270px;" />
                                    </div>
                                    <div>
                                        {{ item.bodytext }}
                                    </div>
                                </div>
                                <div class="message_content" v-else>
                                    <p class="m0px">
                                        {{ item.bodytext }}
                                    </p>
                                </div>
                            </div>

                            <!-- <div  v-if="item.messagejson!=null && item.bodytext==null " class="text-end mr-10">
                                <div v-if="checkfiletype(1, item)">
                                    <img :src="getsourceurl(item)" @load="handleLoad" class="background-chat ">
                                </div>
                                <div v-if="checkfiletype(4, item)">
                                    <video class="background-chat" width="320" height="240" controls
                                        onload="handleLoad">
                                        <source :src="getsourceurl(item)" type="video/mp4">
                                        <source :src="getsourceurl(item)" type="video/ogg">
                                        Your browser does not support the video tag.
                                    </video>

                                </div>
                                <div v-if="checkfiletype(3, item)">
                                    <audio controls onload="handleLoad" class="background-chat">
                                        <source :src="getsourceurl(item)" type="audio/ogg">
                                        <source :src="getsourceurl(item)" type="audio/mpeg">
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <div v-if="checkIfDocument(item)">
                                    <a :href="getsourceurl(item)" download>
                                        <img @load="handleLoad"
                                            src="https://gradmainbucket.s3.amazonaws.com/other/chats/images/5aa737c1-1f4b-4a1f-87b5-e5f78c279993.png"
                                            class="background-chat" />
                                    </a>
                                </div>
                            </div> -->
                        </li>
                    </ul>
                </div>

            </div>
            <div class="border_top  h50">
                <div class="flex-align-center-start" v-if="getlastmessage()">
                    <div class="col-md-11">
                        <div class="col-md-12">
                            <input type="text" class="input_send" v-on:keyup.enter="send()" v-model="textmodel"
                                placeholder="Write your message....." />
                        </div>
                    </div>
                    <!-- <div class="col-md-1 ">
                        <div class="text-center border_right border_left">
                            <i class='bx bx-paperclip' style="font-size: 25px;padding: 13px 0px;"></i>
                        </div>
                    </div> -->
                    <div class="col-md-1">
                        <div class="text-center send" @click="send()">
                            <i class='bx bx-send' style="font-size: 25px;padding: 13px 0px;color: #fff;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { elements } from 'chart.js';
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
    data() {
        return {
            textmodel: '',
            scrollHeight: 0,
            moment: moment,

        }
    },
    computed: {
        ...mapGetters(['selectedthread', 'loggedinuser', 'messages'])
    },
    mounted() {
        // window.scrollTo(0, 0);
    },
    methods: {

        send() {
            if (this.textmodel != '') {
                this.$store.commit('assignloadingstatus', 0)

                let param = {
                    threadids: this.selectedthread?.id, sendtotype: 4, message: this.textmodel
                }
                axios.post('api/threads/wattsapp/bulk', param)
                    .then((response) => this.processSendResponse(response.data))
                    .catch((error) => console.log(error))
            }
        },
        processSendResponse(data) {
            this.textmodel=''
            this.$store.commit("assignfetchmessagepayload", { threadid: data?.thread?.threadidid })
            this.$store.dispatch("fetchMessages");
            this.$store.commit('assignloadingstatus', 0)
        },
        checksenderuser(item) {
            if (item.fromcompany == 1) {
                return 'sent';
            } else {
                return 'receive';
            }
        },
        // checkmsgtype(item) {
        //     if (item.messagejson) {

        //     } else {
        //         return true;
        //     }
        // },
        // checkfiletype(type, item) {
        //     if (item.id = 3549)
        //         console.log("Item here", item)
        //     var myJson2 = JSON.parse(item.messagejson);
        //     if (myJson2.iswattsapp == type) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        getsourceurl(item) {
            var myJson2 = JSON.parse(item.messagejson);
            if (myJson2.url != '') {
                return myJson2.url;
            }
            return '';
        },
        checkIfDocument(item) {
            var myJson2 = JSON.parse(item.messagejson);
            let types = [6, 7, 8, 9, 10]
            if (types.includes(myJson2.type)) {
                return true
            }
            return false
        },
        getUrl(item) {
            let url = ''
            let jsonValue = JSON.parse(item.messagejson)
            if (jsonValue[0]['image'] != 'undefined') {
                if (jsonValue[0].image != null && jsonValue[0].image != '') {
                    url = jsonValue[0].image
                }
            }
            return url;
        },
        handleLoad() {
            this.scrollToBottom()
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = document.querySelector('#chat-message')
                container.scrollTop = container.scrollHeight
            })
        },
        getlastmessage(){
            if(this.messages.length>0){
                let reversed = [...this.messages].reverse()
                let message = reversed.find(block => block.fromcompany == 0)
                if(typeof message !=='undefined'){
                    let lastMessageTime = moment(message?.created_at,'YYYY-MM-DD HH:mm:ss').unix()
                    let currentTime  = Math.floor(Date.now()/1000)
                    let check = currentTime - lastMessageTime
                    if(check < 86400 ) return true; 
                    else return false;
                }else { return false }
            }else {
                return false
            }
        }
    }
}
</script>
<style>
.border_left {
    border-left: 1px solid silver;
}

.border_right {
    border-right: 1px solid silver;
}

.border_top {
    border-top: 1px solid silver;
}

.border_bottom {
    border-bottom: 1px solid silver;
}
.send{
    cursor: pointer;
    background: #1c1c30;
}



.h50 {
    height: 50px;
}

.input_send {
    width: 100%;
    height: 50px;
    border: 0px;
    padding: 0px 10px;
}
</style>