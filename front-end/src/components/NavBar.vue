<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/trains">Trains</RouterLink>
        <RouterLink to="/turnouts">Turnouts</RouterLink>
        <RouterLink to="/power">Power</RouterLink>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
};
</script>
<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
}
</style>
