export default {
    props: [ 'matches' ],
    data() {
        return {
            teamName: undefined,
            homeTeam:"",
            awayTeam:"",
            awayGoals:"",
            homeGoals:"",
            round:0,
            roundThatHasBeen:0,
            errorMessage: "",
        }
    },
    
    template: `
        <div>
            </br> {{ errorMessage }} </br>
            Voeg Team toe
            </br><input placeholder = 'naam' v-model="teamName"/>
           
            </br><button v-on:click="confirmTeam">Stort</button>
            </br>
            </br></br>

            Kan ook wel wedstrijd toevoegen als je wilt
            </br><input placeholder = 'Thuisteam' v-model="homeTeam"/>
            </br><input placeholder = 'Uitteam' v-model="awayTeam"/>
            </br><input placeholder = 'Speelronde' v-model="round" min = 0 step =1/>Speelronde
            </br><button v-on:click="confirmMatch">Stort</button>
            
            </br></br>

            Of missschien uitslagen invullen van speelronde:
            </br><input placeholder = 'round' v-model="roundThatHasBeen" min = 0 step =1/>
            </br><button v-on:click="showMatches">Laat zien dan</button>
            
            </div>
    `,
    methods: {
        confirmTeam() {
            if (!this.teamName) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }

            this.errorMessage = "";
            this.$emit('team-confirmed', this.teamName);                 
        },
        confirmMatch() {
            if (!this.homeTeam || !this.awayTeam) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }

            this.errorMessage = "";
            this.$emit('match-confirmed', this.homeTeam, this.awayTeam, this.round);                 
        },
        showMatches() {
            if (!this.roundThatHasBeen) {
                this.errorMessage = "wel speelronde toevoegen";
                return;
            }
            this.errorMessage = "";
            this.$emit('show-matches', this.roundThatHasBeen);
        }
    }

}