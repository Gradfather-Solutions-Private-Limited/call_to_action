<template>
    <div class="notification-container">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        :class="['notification', notification.type]"
      >
        <span>{{ notification.message }}</span>
        <button @click="removeNotification(index)">✖</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from "vuex";
  
  export default {
    computed: {
      ...mapState(["notifications"]),
    },
    methods: {
      ...mapMutations(["REMOVE_NOTIFICATION"]),
      removeNotification(index) {
        this.REMOVE_NOTIFICATION(index);
      },
    },
  };
  </script>
  
  <style>
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .notification {
    display: flex;
    justify-content: space-between;
    font-family:Bitter;
    align-items: center;
    padding: 8px 19px;
    margin-bottom: 10px;
    border-radius: 1px;
    color: white;
    font-weight: bold;
    min-width: 250px;
  }
  
  .notification button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding-left: 13px;
  }
  
  .notification.success {
    background-color: #4ec569;
  }
  
  .notification.error {
    background-color: #dc3545;
  }
  
  .notification.info {
    background-color: #007bff;
  }

  </style>
  