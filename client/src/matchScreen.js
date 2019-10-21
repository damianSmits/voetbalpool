export default {
    props: [ 'playedMatches' ],
    data() {
        return {  
        }
    },
    
    template: `
        <div>
            Wedstrijden van afgelopen week:</br></br>
            <label v-for="match in playedMatches">
                {{ match["homeTeam"] }} - {{ match["awayTeam"] }}&nbsp;&nbsp;</br>
                {{ match["homeGoals"] }} - {{ match["awayGoals"] }}&nbsp;&nbsp;</br></br>
            </label>
        </div>
    `,
    methods: {   
    }
}