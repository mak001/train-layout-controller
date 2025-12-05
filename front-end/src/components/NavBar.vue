<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/trains">Trains</a>
        <a class="navbar-item" href="/turnouts">Turnouts</a>
        <a class="navbar-item" href="/power">Power</a>
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
