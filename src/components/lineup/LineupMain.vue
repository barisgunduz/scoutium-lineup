<template>
	<v-main class="grey lighten-3" rounded>
		<v-container class="pt-15">
			<lineup-header
				:teamName="teamName"
				:teamLogo="teamLogo"
				:activateButton="activateButton"
				@clicked="lineupCompletedAction"
			/>
			<v-row>
				<v-col class="grey lighten-5" sm="10" offset-sm="1">
					<v-row>
						<v-col class="grey lighten-5" sm="4">
							<v-sheet :height="600" rounded>
								<div v-if="isConfirmedLineup">
									<div class="confirmedLineup">
										<div>
											<img
												:src="teamLogo"
												:alt="teamName"
											/><span :value="teamName">{{
												teamName
											}}</span>
										</div>
									</div>
								</div>
								<div v-else>
									<v-subheader>All Players</v-subheader>
									<v-list
										class="overflow-y-auto hideScrollBar"
										style="max-height: 550px"
									>
										<v-list-item
											v-for="player in players"
											:key="player.id"
										>
											<v-list-item-avatar>
												<img
													:src="player.image_url"
													:alt="player.display_name"
												/>
											</v-list-item-avatar>

											<v-list-item-content>
												<v-list-item-title
													v-text="player.display_name"
												></v-list-item-title>

												<v-list-item-subtitle
													v-text="
														player.position.name
													"
												></v-list-item-subtitle>
											</v-list-item-content>

											<v-list-item-action>
												<v-btn
													icon
													@click="clicked(player)"
												>
													<v-list-item-action-text
														v-if="player.isPicked"
														class="notPicked"
														>Unpick</v-list-item-action-text
													>
													<v-list-item-action-text
														v-else
														class="isPicked"
														>Pick</v-list-item-action-text
													>
												</v-btn>
											</v-list-item-action>
										</v-list-item>
									</v-list>
								</div>
							</v-sheet>
						</v-col>

						<v-col class="grey lighten-5" sm="4">
							<v-sheet :height="600" rounded>
								<v-subheader>Lineup</v-subheader>
								<v-list
									v-if="selectedPlayers.length > 0"
									class="overflow-y-auto hideScrollBar"
									style="max-height: 550px"
								>
									<v-list-item
										v-for="selectedPlayer in selectedPlayers"
										:key="selectedPlayer.id"
									>
										<v-list-item-avatar>
											<img
												:src="selectedPlayer.image_url"
												:alt="
													selectedPlayer.display_name
												"
											/>
										</v-list-item-avatar>

										<v-list-item-content>
											<v-list-item-title
												v-text="
													selectedPlayer.display_name
												"
											></v-list-item-title>

											<v-list-item-subtitle
												v-text="
													selectedPlayer.position.name
												"
											></v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
								<empty-lineup v-else />
							</v-sheet>
						</v-col>

						<v-col class="grey lighten-5" sm="4">
							<v-sheet :height="600">
								<v-subheader>Substitutes</v-subheader>
								<v-list
									v-if="selectedPlayers.length > 10"
									class="overflow-y-auto hideScrollBar"
									style="max-height: 550px"
								>
									<v-list-item
										v-for="substitutePlayerSpec in substitutePlayerSpecs"
										:key="substitutePlayerSpec.id"
									>
										<v-list-item-avatar>
											<img
												:src="
													substitutePlayerSpec.image_url
												"
												:alt="
													substitutePlayerSpec.display_name
												"
											/>
										</v-list-item-avatar>

										<v-list-item-content>
											<v-list-item-title
												v-text="
													substitutePlayerSpec.display_name
												"
											></v-list-item-title>

											<v-list-item-subtitle
												v-text="
													substitutePlayerSpec
														.position.name
												"
											></v-list-item-subtitle>
										</v-list-item-content>
										<v-list-item-action>
											<v-list-item-action-text
												class="isPicked"
												>
												
													<v-icon color="green lighten-1">mdi-arrow-up-thin</v-icon>
												
												{{
													substitutePlayerSpec.substitutionMinute
												}}</v-list-item-action-text
											>
										</v-list-item-action>
									</v-list-item>
									<span
										:style="
											isConfirmedLineup
												? 'display:none'
												: 'display:block'
										"
										class="addSubs"
										@click="outPlayers"
										>+Add Substitution</span
									>
								</v-list>
								<empty-substitute v-else />
							</v-sheet>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-snackbar v-model="snackbar">
			{{ snackbarText }}
			<template v-slot:action="{ attrs }">
				<v-btn
					color="pink"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="text-h5">Add Substitution</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" sm="12">
								<p>Out Player</p>
								<v-select
									:items="selectedPlayers"
									v-model="selectedPlayer"
									item-text="display_name"
									label="Enter Player Name"
									outlined
								></v-select>
							</v-col>
							<v-col cols="12" sm="12">
								<p>In Player</p>
								<v-select
									:items="substitutePlayers"
									v-model="substitutePlayer"
									item-text="display_name"
									label="Enter Player Name"
									outlined
								></v-select>
							</v-col>
							<v-col cols="12" sm="12">
								<p>Substitution Minute</p>
								<v-text-field
									label="Enter minute of substitution"
									v-model="substitutionMinute"
									outlined
								></v-text-field>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						Cancel
					</v-btn>
					<v-btn
						color="blue darken-1"
						text
						@click="addSubs(substitutePlayers, substitutionMinute)"
					>
						Add
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-main>
</template>
<script>
import axios from "axios";
export default {
	data: () => ({
		activateButton: false,
		isConfirmedLineup: false,
		dialog: false,
		players: [],
		teamName: "",
		teamLogo: "",
		selectedPlayers: [],
		selectedPlayer: null,
		substitutePlayers: [],
		substitutePlayer: null,
		substitutionMinute: "",
		addedSubstitutes: [],
		substitutePlayerSpecs: [],
		isPicked: false,
		isLineupDone: false,
		snackbar: false,
		snackbarText: "",
	}),
	components: {
		"lineup-header": require("@/components/lineup/LineupHeader.vue")
			.default,
		"empty-lineup": require("@/components/lineup/EmptyLineup.vue").default,
		"empty-substitute": require("@/components/lineup/EmptySubstitute.vue")
			.default,
	},
	mounted() {
		axios
			.get("https://api.scoutium.com/api/clubs/4031/players?count=200")
			.then((response) => {
				let players = response.data.players;
				this.teamName = players[0].team.club.name;
				this.teamLogo = players[0].team.club.image_url;
				for (let index = 0; index < players.length; index++) {
					if (players[index].team.type == "first_team") {
						// console.log(players[index]);
						this.players.push(players[index]);
					}
				}
			});
	},
	// computed: {
	// 	players() {
	//         console.log(this.$store.state.players);
	// 		return this.$store.state.players;
	// 	},
	// },
	// mounted() {
	// 	this.$store.dispatch("getPlayers");
	// },
	methods: {
		lineupCompletedAction(value) {
			console.log(value); // lineupCompleted
			if (value == "lineupCompleted") {
				this.isConfirmedLineup = true;
			}
		},
		clicked(player) {
			let playerInLineup = this.players.filter(
				(selectedPlayer) => selectedPlayer.id === player.id
			)[0];

			if (this.selectedPlayers.length == 11) {
				this.isLineupDone = true;
			}

			if (player.isPicked) {
				this.selectedPlayers.splice(
					this.selectedPlayers.indexOf(playerInLineup),
					1
				);
				playerInLineup.isPicked = false;
			} else {
				if (!(this.selectedPlayers.length > 10)) {
					playerInLineup.isPicked = true;
					this.selectedPlayers.push(playerInLineup);
				} else {
					this.snackbarText =
						"Lineup is full (11 players selected) !";
					this.snackbar = true;
				}
			}
			if (this.selectedPlayers.length > 10) {
				this.activateButton = true;
			}
		},
		outPlayers() {
			if (!(this.substitutePlayerSpecs.length > 4)) {
				this.dialog = true;
				this.substitutePlayers = this.players.filter(
					(i) => this.selectedPlayers.indexOf(i) === -1
				);
			} else {
				this.snackbarText = "You can only substitute 5 players!";
				this.snackbar = true;
			}
		},
		addSubs(substitutePlayers, substitutionMinute) {
			for (let index = 0; index < substitutePlayers.length; index++) {
				const element = substitutePlayers[index];
				element = {...element, substitutionMinute: substitutionMinute}
				if (element.display_name === this.substitutePlayer) {
					this.substitutePlayerSpecs.push(element);
					this.dialog = false;
				}
			}
		},
	},
};
</script>
<style lang="sass">
.isPicked
  color: rgb(56, 82, 255) !important
.notPicked
  color: rgb(230, 56, 70) !important
.v-application .text-h4
  line-height:1.5 !important
.hideScrollBar::-webkit-scrollbar
  display: none
.addSubs
  margin: 20px
  font-size: 12px
  cursor: pointer
  line-height: 14px
  color: rgb(56 215 6)
.confirmedLineup
  padding-top: 70%
  display: flex
  align-items: center
  justify-content: center
  img
      display: flex
      align-items: center
      justify-content: center
      width: 130px
  span
      height: 100%
      display: flex
      align-items: center
      justify-content: center
</style>
