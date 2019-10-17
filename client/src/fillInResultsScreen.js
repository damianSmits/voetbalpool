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
                <li v-for="match in matches">
                    <label>{{ match["round"] }}</label>:
                    <label>{{ match["homeTeam"] }}</label> 
                    <input min = 0 step =1 size="1">-
                    <input min = 0 step =1 size="1"> 
                    <label>{{ match["awayTeam"] }}</label>&nbsp;&nbsp;
                    <button v-on:click="sendMatchResults">Stort</button> 
                </li>
                
                {{ confirmedResultMessage }}
        </div>
            
    `,
    methods: { 
        sendMatchResults(){
            this.confirmedResultMessage = event.target.parentNode.children[1].innerHTML + " - " + event.target.parentNode.children[4].innerHTML + " resultaat toegevoegd!"
            console.log(event.target.parentNode.children[1].innerHTML)
            this.$emit("give-results-to-matches", event.target.parentNode.children[1].innerHTML, event.target.parentNode.children[1].innerHTML, event.target.parentNode.children[2].value, event.target.parentNode.children[3].value, event.target.parentNode.children[0].innerHTML)
        }  
    }
}