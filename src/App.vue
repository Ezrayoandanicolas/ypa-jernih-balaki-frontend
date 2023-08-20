<template>
  <div id="main" class="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
      >
        <component :is="dynamicNavigation"></component>
      </transition>
  </div>
</template>

<script>
import DefaultNavigation from './components/layouts/Navigation.vue'
import AdminNavigation from './components/layouts/AdminNavigation.vue'

export default {
  name: 'App',
  setup() {
    // 
  },
  data() {
    return {
      // 
    }
  },
  computed: {
    dynamicNavigation() {
      switch (this.$route.meta.navigation) {
            case "guest":
                return DefaultNavigation;
            case "auth":
                return AdminNavigation;
            default:
                return DefaultNavigation;
        }
    }
  },
  components: {
    // HelloWorld
    DefaultNavigation,
    AdminNavigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  width: 100%;
  height: 100%;
}
</style>
