export default {
    props: [ 'myPredictions' ],
    data() {
        return {
            errorMessage:"",  
        }
    },
    
    template: `
        <div>
            </br></br>
            <span class="myPredictionsHeader">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbspThuis team
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Uit team</span></br>
            <label v-if="myPredictions.length==0">Geen resultaten gevonden.</label>
            <label v-for="prediction in myPredictions">
                    <label class ="homeTeam">{{ prediction["homeTeam"] }}</label> 
                    {{ prediction["predictedHomeGoals"] }} -
                    {{ prediction["predictedAwayGoals"] }}
                    <label class ="homeTeam">{{ prediction["awayTeam"] }}</label></br>
                </label>
        </div>
            
    `,
    methods: { 
    }
}