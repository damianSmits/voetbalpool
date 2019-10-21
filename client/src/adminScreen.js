export default {
    props: [ 'matches' ],
    data() {
        return {
            teamName: undefined,
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
        }
    },
    
    template: `
        <div>
            </br> {{ errorMessage }} </br>
            Voeg Team toe
            </br><input placeholder = 'naam' v-model="teamName"/>
                {{ confirmedTeamMessage }}
           
            </br><button class = "regularButton" v-on:click="confirmTeam" on:click="color:powderblue;">Stort</button>
            </br>
            </br></br>

            Kan ook wel wedstrijd toevoegen als je wilt
            </br><input placeholder = 'Thuisteam' v-model="homeTeam"/>
            </br><input placeholder = 'Uitteam' v-model="awayTeam"/>
            </br><input placeholder = 'Speelronde' v-model="round"/>
            </br><input placeholder = 'yyyymmdd' v-model="datum" />

            </br><button class = "regularButton" v-on:click="confirmMatch">Stort</button>
            {{ confirmedMatchMessage }}
            
            </br></br>

            Of missschien uitslagen invullen van speelronde:
            </br><input placeholder = 'round' v-model="roundThatHasBeen" min = 0 step =1/>
            </br><button class = "regularButton" v-on:click="showMatches">Laat zien dan</button>
            
            </br></br>

            Laatste optie: geef punten aan spelers
            </br><button class = "regularButton" v-on:click="giveScore">score</button></br>
            {{ confirmedScoreMessage }}
            </div>
    `,
    methods: {
        confirmTeam() {
            if (!this.teamName) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }
            this.confirmedTeamMessage = this.teamName + " Toegevoegd!";
            this.errorMessage = "";
            this.$emit('team-confirmed', this.teamName);                 
        },
        confirmMatch() {
            if (!this.homeTeam || !this.awayTeam) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }
            this.confirmedMatchMessage = this.homeTeam + " - " + this.awayTeam + " toegevoegd!"
            this.errorMessage = "";
            this.$emit('match-confirmed', this.homeTeam, this.awayTeam, this.round, this.datum);                 
        },
        showMatches() {
            if (!this.roundThatHasBeen) {
                this.errorMessage = "wel speelronde toevoegen";
                return;
            }
            this.errorMessage = "";
            this.$emit('show-matches', this.roundThatHasBeen);
        },
        giveScore(){
            event.target.disabled="true";
            this.confirmedScoreMessage = "Score geteld!";
            this.$emit('give-score')
        }
    }

}