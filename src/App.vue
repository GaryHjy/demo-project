<template>
  <div id="app">
    <div class="app-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editor">Editor</router-link>
    </div>
    <div class="app-main">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app {
  &-nav {
    height: 60px;
    line-height: 60px;
    background-color: #eee;
  }
  &-main {
    flex: 1;
    padding: 18px;
  }
}
</style>
