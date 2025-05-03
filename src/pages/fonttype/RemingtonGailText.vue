<template>
    <!-- <textarea id="counter-text"></textarea> -->
    <textarea class="form-control no-paste" :value="userInput" @keydown="updateInput"  id="counter-text" @paste.prevent ></textarea>
</template>
<script type="text/javascript">

export default {
    props: {
        userInput: {
            type: String,
            required: true,
        },
    },
    mounted() {
        // this.$refs.counterText.addEventListener('input', this.updateCounter);
        const script = document.createElement('script');
        script.src = 'https://assets-allwebsites.s3.ap-south-1.amazonaws.com/common/jquery.min.js';
        script.onload = () => {
            console.log('jQuery loaded successfully');

            // Load the second script after the first one has loaded
            const script1 = document.createElement('script');
            script1.src = 'https://assets-allwebsites.s3.ap-south-1.amazonaws.com/common/typingbaba.js';
            script1.onload = () => {
                console.log('typingbaba.js loaded successfully');
            };
            document.head.appendChild(script1);
        };
        document.head.appendChild(script);
        
    },
    methods:{
        updateInput(event) {
            setTimeout(() => {
                // Emit the updated value to the parent on keydown after a small delay
                this.$emit('updateInput', event.target.value);
            }, 100); // Adjust the timeout value as needed (in ms)
        },
    }
}
</script>