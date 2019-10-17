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
        }
    },
    
    template: `
        <div>
            
            </br></br>{{ errorMessage }}</br></br>
            <li v-for="match in matchesToPredict">
                    {{ match["round"] }}: <label>{{ match["homeTeam"] }}</label> 
                    <input min = 0 step =1 size="1"> -
                    <input min = 0 step =1 size="1"> 
                    <label>{{ match["awayTeam"] }}</label>&nbsp;&nbsp;
                    <button v-on:click="sendPrediction">voorspel!</button>
                </li>
        </div>
            
    `,
    methods: { 
        sendPrediction(){
            if(localStorage.length == 0){
                this.errorMessage = "bennie ingelogd"
            } else{
                console.log(event.target.parentNode.children[1].value)
                this.$emit("send-prediction", event.target.parentNode.children[1].value, event.target.parentNode.children[0].innerHTML, 
                event.target.parentNode.children[3].innerHTML, event.target.parentNode.children[2].value, localStorage["username"])
            }
        }    
    }
}