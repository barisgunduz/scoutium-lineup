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
	name: "Home",
	components: {
		"app-bar": require("@/components/AppBar.vue").default,
		"lineup-main": require("@/components/lineup/LineupMain.vue").default,
	},
};
</script>

<style>
@font-face {
	font-family: SofiaProRegular;
	src: url("/fonts/Mostardesign-SofiaProRegular.otf");
	font-weight: normal;
}

.confirmLineupCompleted{
	font-family: SofiaProRegular;
    font-size: 15px !important;
    line-height: 18px;
    width: 200px;
}

.v-application .text-h4 {
	font-family: SofiaProRegular;
}

.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: rgba(150, 153, 190, 1) !important;
    color: white !important;
}

.theme--light.v-btn.v-btn--has-bg {
    background-color: #3852FF;
    color: white;
}

.theme--light.v-tabs > .v-tabs-bar {
    background-color: #02063F;
}

.theme--light.v-subheader{
	font-family: SofiaProRegular;
	font-size: 16px
}

.v-subheader {
	font-family: SofiaProRegular;
    font-size: 16px;
    font-weight: 600;
}


.v-list-item__subtitle {
	font-family: SofiaProRegular;
    font-size: 12px;
}
.v-list-item__title{
	font-family: SofiaProRegular;
	font-size: 14px;
}
</style>
