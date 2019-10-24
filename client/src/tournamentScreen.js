export default {
    created(){
        this.getTeams()
    },
    data() {
        return {
            showGroups:false,
            amountOfTeamsInGroup:0,
            amountOfGroups:0,
            AmountOfTeams:0,
            team:"",
            round:"",
            tournamentNamer:"",
            errorMessage:"",
            teamsForTournament:undefined,
        }
    },
    props: {  
        teams: "teams",
    },
    template: `
        <div style="overflow:auto">
            </br>

        Voeg Toernooi toe
            </br><input placeholder = 'toernooinaam' v-model="tournamentNamer"/></br></br>
       
        Hoeveel teams totaal:
        <label id="teamAmount">
            <select style="width: 45px">
                <option>16</option>
            </select></br></br></br>
        </label>
            
        Hoeveel teams per Poule:
        <label id="groupTeamAmount">
            <select style="width: 45px">
                <option>4</option>
            </select></br></br>
            <button class="regularButton" v-on:click="fillInGroups">Vul poules in</button>
            {{ errorMessage }}
        </label>
        
        <div v-if=showGroups><button class="regularButton" v-on:click="sendTournamentData">Stort</button>
        
            <label class="groups" v-for="index in amountOfGroups" :key="index">
            </br>Groep:{{index}}</br></br>
                <label v-for="index in amountOfTeamsInGroup" :key="index">
                <select style="width: 180px">
                <option v-for="team in teams">{{ team["teamName"] }}</option></br>
            </select></br>
            </label></br></label>
        </div>
        </div>
    `,
    methods: {
        fillInGroups(){
            if(this.tournamentNamer !==""){
                let teamAmount = document.getElementById("teamAmount").children[0].value;
                let groupTeamAmount = document.getElementById("groupTeamAmount").children[0].value;
                this.amountOfGroups = teamAmount / groupTeamAmount;
                this.amountOfTeamsInGroup = groupTeamAmount/1;
                this.amountOfTeams = teamAmount/1;
                this.showGroups=true;
                return this.showGroups;
            }else {
                this.errorMessage = "Wel Toernooi naam invullen";
            }
        },
        getTeams(){
            this.teams = teams;
            this.rounds = rounds;
        },
        sendTournamentData(){
            this.teamsForTournament=[];
            for(let i=0; i<this.amountOfTeamsInGroup; i++){
                for(let j=0; j<this.amountOfGroups; j++){
                    this.teamsForTournament.push(
                        event.target.parentNode.children[1+j].children[3 + i].children[0].value
                    )
                }
            }
            if((new Set(this.teamsForTournament)).size !== this.teamsForTournament.length){
                alert("Je hebt vaker hetzelfde team in je toernooi!")
            } else {
                this.$emit('send-tournament-data', this.tournamentNamer, this.teamsForTournament, this.amountOfTeamsInGroup, this.amountOfTeams);
            }
        },
    }
}