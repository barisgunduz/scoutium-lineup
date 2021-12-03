<template>
  <v-app id="inspire">
		<!-- Header -->
		<app-bar />
		<!-- Main Section -->
		<lineup-main />
	</v-app>
</template>

<script>

  export default {
    name: 'Home',
    components: {
		"app-bar": require("@/components/AppBar.vue").default,
		"lineup-main": require("@/components/lineup/LineupMain.vue").default,
	}
  }
</script>
