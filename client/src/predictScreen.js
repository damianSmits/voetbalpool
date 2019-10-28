export default {
    props: [ 'matchesToPredict' ],
    data() {
        return {  
                homeGoals: undefined,
                awayGoals: undefined,
                homeTeam: undefined,
                awayTeam: undefined,
                ronde:false,
                errorMessage:"",
                goedzo: "",
                isTournament: false,
                loginName: localStorage["username"],
        }
    },
    
    template: `
    <div style="overflow-y : auto" class="split right">
        <button class = "regularButton" v-on:click="showTournament" v-if=!isTournament>naar Toernooi</button>
        <button class = "regularButton" v-on:click="showTournament" v-if=isTournament>naar Competitie</button>
            <div v-if=!isTournament>

            </br>{{ errorMessage }}{{ goedzo }}</br>
                <span class = "predictionHeader">R: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                Thuis team 
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Uit Team
                    </span></br>
                    <label v-if="matchesToPredict.length==0">Geen resultaten gevonden.</label>
                <label v-for="(match, index) in matchesToPredict">
                    <span>{{ match["round"] }}</span> 
                    <span class = "homeTeam">{{ match["homeTeam"] }}</span> 
                    <input type = "number" min = 0 step =1 style="width: 3em" oninput="this.value = Math.abs(this.value)"> -
                    <input type = "number" min = 0 step =1 style="width: 3em" oninput="this.value = Math.abs(this.value)"> 
                    <span class = "homeTeam">{{ match["awayTeam"] }}</span>&nbsp;&nbsp;
                    <button class = "regularButton" v-on:click="sendPrediction">voorspel!</button></br> 
                </label>
            </div>
            
            <div v-if=isTournament>

            </br>{{ errorMessage }}{{ goedzo }}</br>
                <span class = "predictionHeader">P: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                Thuis team 
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Uit Team
                    </span></br>
                    <label v-if="matchesToPredict.length==0">Geen resultaten gevonden.</label>
                <label v-for="(match, index) in matchesToPredict">
                    <span>{{ match["poule"] }}</span> 
                    <span class = "homeTeam">{{ match["homeTeam"] }}</span> 
                    <input type = "number" min = 0 step =1 style="width: 3em" oninput="this.value = Math.abs(this.value)"> -
                    <input type = "number" min = 0 step =1 style="width: 3em" oninput="this.value = Math.abs(this.value)"> 
                    <span class = "homeTeam">{{ match["awayTeam"] }}</span>&nbsp;&nbsp;
                    <button class = "regularButton" v-on:click="sendPrediction">voorspel!</button></br> 
                </label>
            </div>
        </div>
            
    `,
    methods: {
        sendPrediction(){
            if(localStorage.length == 0){
                this.errorMessage = "bennie ingelogd"
            } else{
                if(event.target.parentNode.children[2].value){
                    this.goedzo ="Ingevuld!"
                }
                console.log(event.target.parentNode.children[2].value)
                this.$emit("send-prediction", event.target.parentNode.children[2].value, event.target.parentNode.children[1].innerHTML, 
                event.target.parentNode.children[4].innerHTML, event.target.parentNode.children[3].value, 
                event.target.parentNode.children[0].innerHTML, localStorage["username"])
                event.target.disabled= true;
            }
        },
        showTournament(){
            if(!this.isTournament){
                this.$emit('show-tournament-matches-to-predict', this.loginName); 
            }
            if(this.isTournament === true){
                this.$emit('show-league-matches-to-predict', this.loginName); 
            }
            this.isTournament = !this.isTournament 
            return this.isTournament
        },
    }
}