export default {
    props: [ 'users' ],
    data() {
        return {
        }
    },
    
    template: `
        <div>
           <ol> 
            <li v-for="user in users">
                    <label>{{ user["userName"] }}</label>
                    &nbsp&nbsp&nbsp
                    <label>{{ user["score"] }}</label>
                </li>
            </ol>
        </div>
            
    `,
    methods: { 
    }
}