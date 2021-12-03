<template>
	<v-app-bar app class="headerDark" flat>
		<v-container>
			<v-row>
				<v-col sm="10" offset-sm="1">
					<v-list-item>
						<v-tabs>
							<span class="text-h4">SCOUTIUM</span>
						</v-tabs>

						<v-avatar>
							<img
								src="https://en.gravatar.com/userimage/118127490/e570cd0ca66d0e3a14d05f891c5d1e90.jpg?size=200"
								alt="Barış Gündüz"
							/>
						</v-avatar>
					</v-list-item>
				</v-col>
			</v-row>
		</v-container>
	</v-app-bar>
</template>
<script>
export default {};
</script>
<style lang="sass">
.headerDark
  background-color: rgb(2 6 63) !important
.v-application .text-h4
  line-height: 1.5 !important
  color: rgb(72 200 144) !important
</style>
