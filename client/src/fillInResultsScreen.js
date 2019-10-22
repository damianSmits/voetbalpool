export default {
    props: [ 'matches' ],
    data() {
        return {  
               homeTeam: "",
               awayTeam: "",
               homeGoals: 0,
               awayGoals: 0,
               confirmedResultMessage:"",
               round: ""
        }
    },
    
    template: `
        <div>
            <span class = "fillInResultsHeader">R: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Thuis team 
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Uit Team
            </span></br>

                <label v-for="match in matches">
                    <label class="round">{{ match["round"] }}</label>:
                    <label class="homeTeam">{{ match["homeTeam"] }}</label> 
                    <input min = 0 step =1 size="1"> -
                    <input min = 0 step =1 size="1"> 
                    <label class="homeTeam">{{ match["awayTeam"] }}</label>&nbsp;&nbsp;
                    <button class = "regularButton" v-on:click="sendMatchResults">Stort</button></br> 
                </label>
                
                {{ confirmedResultMessage }}
        </div>
            
    `,
    methods: { 
        sendMatchResults(){
            this.confirmedResultMessage = event.target.parentNode.children[1].innerHTML + " - " + event.target.parentNode.children[4].innerHTML + " resultaat toegevoegd!"
            console.log(event.target.parentNode.children[1].innerHTML)
            event.target.disabled = true;
            this.$emit("give-results-to-matches", event.target.parentNode.children[1].innerHTML, event.target.parentNode.children[4].innerHTML, event.target.parentNode.children[2].value, event.target.parentNode.children[3].value, event.target.parentNode.children[0].innerHTML)
        }  
    }
}