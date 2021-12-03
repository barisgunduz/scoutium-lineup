import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// players: [],
		// playerList: [],
		// teamName: "",
		// teamLogo: "",
		// selectedPlayers: [],
		// isPicked: false,
		// isLineupDone: false,
		// snackbar: {
		// 	show: false,
		// 	text: "",
		// },
	},
	mutations: {
		// GET_PLAYERS(state, players) {
		// 	state.players = players
		// }
	},
	actions: {
		// getPlayers({ commit }) {
			
		// 	axios
		// 	.get("https://api.scoutium.com/api/clubs/4031/players?count=200")
		// 	.then((response) => {
		// 		let players = response.data.players;
		// 		this.teamName = players[0].team.club.name;
		// 		this.teamLogo = players[0].team.club.image_url;
		// 		for (let index = 0; index < players.length; index++) {
		// 			if (players[index].team.type == "first_team") {
		// 				playerList.push(players[index]);
		// 			}
		// 		}
		// 		commit('GET_PLAYERS', playerList)
		// 	});
		// }
	},
	modules: {
	}
})
