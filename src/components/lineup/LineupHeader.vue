<template>
	<v-row>
		<v-col class="white lighten-5" sm="10" offset-sm="1">
			<div v-if="!isLineupCompleted">
				<v-list-item>
					<v-list-item-avatar>
						<img :src="teamLogo" :alt="teamName" />
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title
							v-text="teamName"
						></v-list-item-title>
					</v-list-item-content>
					<v-btn
                        class="confirmLineupCompleted"
						right
						:disabled="!activateButton"
						@click="lineupCompleted"
					>
						Confirm
					</v-btn>
				</v-list-item>
			</div>
			<div v-else>
				<v-banner single-line class="text-center">
					<v-icon slot="icon" class="checkDone" size="36">
						mdi-check
					</v-icon>
					Squad saved successfully
				</v-banner>
			</div>
		</v-col>
	</v-row>
</template>
<script>
export default {
    data() {
        return {
            isLineupCompleted: false
        }
    },
	props: ["teamName", "teamLogo", "activateButton"],
	methods: {
		lineupCompleted(event) {
			this.$emit("clicked", "lineupCompleted");
            this.isLineupCompleted = true
		},
	},
};
</script>
<style lang="sass">
.checkDone
    color: white !important
    background: rgb(73 201 143) !important
</style>
