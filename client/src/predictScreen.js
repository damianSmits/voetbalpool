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
        }
    },
    
    template: `
        <div>
            </br></br>{{ errorMessage }}</br></br>
            <span class = "predictionHeader">R: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Thuis team 
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Uit Team
                    </span></br>
            <label v-for="(match, index) in matchesToPredict">
                    {{ match["round"] }}: <span class = "homeTeam">{{ match["homeTeam"] }}</span> 
                    <input min = 0 step =1 size="1"> -
                    <input min = 0 step =1 size="1"> 
                    <span class = "homeTeam">{{ match["awayTeam"] }}</span>&nbsp;&nbsp;
                    <button class = "regularButton" v-on:click="sendPrediction">voorspel!</button></br> 
                </label>
                {{ goedzo }}
        </div>
            
    `,
    methods: { 
        sendPrediction(){
            if(localStorage.length == 0){
                this.errorMessage = "bennie ingelogd"
            } else{
                if(event.target.parentNode.children[1].value){
                    this.goedzo ="Ingevuld!"
                }
                console.log(event.target.parentNode.children[1].value)
                this.$emit("send-prediction", event.target.parentNode.children[1].value, event.target.parentNode.children[0].innerHTML, 
                event.target.parentNode.children[3].innerHTML, event.target.parentNode.children[2].value, localStorage["username"])
                event.target.disabled= true;
            }
        }    
    }
}