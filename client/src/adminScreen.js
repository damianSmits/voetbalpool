export default {
    created(){
        this.getTeams()
    },
    props: { matches:"matches", 
             teams: "teams", 
             rounds: "rounds"},
    data() {
        return {
            teamNamer: undefined,
            homeTeam:"",
            awayTeam:"",
            awayGoals:"",
            homeGoals:"",
            round:"",
            roundThatHasBeen:"",
            errorMessage: "",
            confirmedTeamMessage: "",
            confirmedMatchMessage: "",
            datum:"",
            confirmedScoreMessage: "",
            team:"",
            round:"",
            tournamentName:"",
        }
    },
    
    template: `
        <div>
            </br> {{ errorMessage }} </br>
            Voeg Team toe
            </br><input placeholder = 'naam' v-model="teamNamer"/></br>
            <button class = "regularButton" v-on:click="confirmTeam">Stort</button>
            {{ confirmedTeamMessage }}
            </br>
            </br></br>
            Kan ook wel wedstrijd toevoegen als je wilt</br>
            <select style="width: 180px">
                <option v-for="team in teams">{{ team["teamName"] }}</option>
            </select></br>
            <select style="width: 180px">
                <option v-for="team in teams">{{ team["teamName"] }}</option>
            </select>
            </br><input placeholder = 'Speelronde' v-model="round" style="width: 176px"/>
            </br><input type="date" value="2019-01-01" v-model="datum" style="width: 175px"/>

            </br><button class = "regularButton" v-on:click="confirmMatch">Stort</button>
            </br>{{ confirmedMatchMessage }}
            
            </br></br>

            Of missschien uitslagen invullen van speelronde:
            </br><select style="width: 180px">
                <option v-for="round in rounds">{{ round["roundName"] }}</option>
            </select>
            </br><button class = "regularButton" v-on:click="showMatches">Laat zien dan</button>
            
            </br></br></br>
            
            </br></br>
            Laatste optie: geef punten aan spelers
            </br><button class = "regularButton" v-on:click="giveScore">score</button></br>
            {{ confirmedScoreMessage }}
            </div>
    `,
    methods: {
        confirmTeam() {
            console.log(this.teams)
            if (!this.teamNamer) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }
            this.confirmedTeamMessage = this.teamNamer + " Toegevoegd!";
            this.errorMessage = "";
            this.$emit('team-confirmed', this.teamNamer);                 
        },
        confirmMatch() {
            console.log(event.target.parentNode.children[10].value)
            console.log(event.target.parentNode.children[12].value)
            if (event.target.parentNode.children[10].value == event.target.parentNode.children[12].value) {
                alert("Thuis- en uitteam zijn hetzelfde");
                return;
            }
            this.confirmedMatchMessage = event.target.parentNode.children[10].value + " - " + event.target.parentNode.children[12].value + " toegevoegd!"
            this.errorMessage = "";
            this.$emit('match-confirmed', event.target.parentNode.children[10].value, event.target.parentNode.children[12].value, this.round, this.datum);                 
        },
        showMatches() {
            this.roundThatHasBeen = event.target.parentNode.children[23].value
            this.$emit('show-matches', this.roundThatHasBeen);
        },
        giveScore(){
            event.target.disabled="true";
            this.confirmedScoreMessage = "Score geteld!";
            this.$emit('give-score')
        },
        getTeams(){
            this.teams = teams;
            this.rounds = rounds;
        },
    }
}