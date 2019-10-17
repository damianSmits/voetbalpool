export default {
    data() {
        return {
            isAdmin: true,
            userName: ""
        }
    },
    template: `
        <div>
            <button v-on:click="adminRights" v-if=isAdmin>admin</button>    
            <button v-on:click="getPlayedMatches">laat afgelopen potjes zien</button>  
            <button v-on:click="showMatchesToPredict">voorspel komende potjes</button>
            <button v-on:click="showMyPredictions">Mijn voorspellingen</button>
            <button v-on:click="showRegisterUser">Registreer</button>
            <button v-on:click="showUserLogin">Inloggen</button>  
            <button v-on:click="userLogOff">Uitloggen</button> 
        </div>      
    `,
    methods: {   
        adminRights(){
            this.$emit('admin-confirmed', isAdmin); 
        },
        getPlayedMatches(){
            this.$emit('get-played-matches'); 
        },
        showPlayedMatches(){
            this.$emit('show-played-matches'); 
        },
        showRegisterUser(){
            this.$emit('show-register-user'); 
        },
        showUserLogin(){
            this.$emit('show-user-login'); 
        },
        showMatchesToPredict(){
            this.$emit('show-matches-to-predict'); 
        },
        userLogOff(){
            if(localStorage.length != 0){
            localStorage.clear();
            alert("k doei")
            }
        },
        showMyPredictions(){
            if(localStorage.length != 0){
                this.userName = localStorage["username"]
            }
            this.$emit('show-my-predictions', this.userName);
        }
    }
}