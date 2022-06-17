<template>
  <nav class="navbar bg-primary">
    <span @click="$router.push({ name: 'daybook' })" class="navbar-brand text-white pointer">
      <img
          src="@/assets/logo.png"
          alt="Vue Logo"
          height="24"
          class="d-inline-block align-text-top mx-2"
      >
      Daybook
    </span>

    <div class="d-flex">
      <button class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DaybookNavbar"
}
</script>