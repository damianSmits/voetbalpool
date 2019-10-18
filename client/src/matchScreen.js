export default {
    props: [ 'playedMatches' ],
    data() {
        return {  
        }
    },
    
    template: `
        <div>
            <li v-for="match in playedMatches">
                {{ match["homeTeam"] }} vs. {{ match["awayTeam"] }}&nbsp;&nbsp;
                {{ match["homeGoals"] }}-{{ match["awayGoals"] }}&nbsp;&nbsp;
            </li>
        </div>
    `,
    methods: {   
    }
}