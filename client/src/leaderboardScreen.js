export default {
    props: [ 'users' ],
    data() {
        return {
        }
    },
    
    template: `
        <div>
        </br></br></br>
        <span class="leaderboardHeader">
        #&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        Naam
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        Pt.
        </span></br>
            <label v-for="(user, index) in users">
                    <label class = "rank">{{ index + 1 }}. </label>
                    <label class="homeTeam">{{ user["userName"] }}</label>
                    &nbsp&nbsp&nbsp
                    <label class="score">{{ user["score"] }}</label></br>
                </label>
        </div>
            
    `,
    methods: { 
    }
}