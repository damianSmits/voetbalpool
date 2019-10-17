export default {
    props: [ 'myPredictions' ],
    data() {
        return {
            errorMessage:"",  
        }
    },
    
    template: `
        <div>
            
            </br></br>{{ errorMessage }}</br></br>
            <li v-for="prediction in myPredictions">
                    {{ prediction["round"] }}: <label>{{ prediction["homeTeam"] }}</label> 
                    {{ prediction["predictedHomeGoals"] }} -
                    {{ prediction["predictedAwayGoals"] }}
                    <label>{{ prediction["awayTeam"] }}</label>
                </li>
        </div>
            
    `,
    methods: { 
    }
}