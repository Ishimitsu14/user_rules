<template>
  <div>
    <ul class="list-unstyled float-left">
      <li>Email</li>
      <li>Last Login</li>
      <li>Banned</li>
    </ul>
    <ul class="list-unstyled float-right">
      <li>{{ user.email }}</li>
      <li>{{ user.last_login }}</li>
      <li><b-checkbox v-model="user.banned" /></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "UserView",
    props: {
      user: {
        type: Object,
        required: true
      }
    },

  }
</script>

<style scoped lang="scss">
  .hide-header > thead {
    display:none !important;
  }
</style>
