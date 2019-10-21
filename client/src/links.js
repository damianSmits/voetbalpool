export default {
    created(){
        this.getPlayedMatches();
    },
    data() {
        return {
            userName: "",
            loginName: localStorage["username"],
            password:"",
            isAdmin: "loginName==='damian'",
            isNotLoggedIn: "localStorage.length==0" 
        }
    },
    template: `
        <div>
        <header id="linkHeader">

            <button class = "headerButton" v-on:click="adminRights" v-if=isAdmin>Admin</button>    
            <button class = "headerButton" v-on:click="showMatchesToPredict" v-if=!isNotLoggedIn>Voorspel komende potjes</button>
            <button class = "headerButton" v-on:click="showMyPredictions" v-if=!isNotLoggedIn>Mijn voorspellingen</button>
            <button class = "headerButton" v-on:click="showLeaderboard" v-if=!isNotLoggedIn>Leaderboard</button>
            

            <input v-model="userName" placeholder="Gebruikersnaam" v-if=isNotLoggedIn></input>
            <input id="passwordInput" v-model="password" type="password" placeholder = "wachtwoord" v-if=isNotLoggedIn></input>
            <button id="loginButton" class = "headerButton"  v-on:click="userLogin" v-if=isNotLoggedIn>Inloggen</button> 
            <span v-if=isNotLoggedIn>||</span> 



            <button class = "headerButton" v-on:click="showRegisterUser" v-if=isNotLoggedIn>Registreer</button>
            <button class = "headerButton" v-on:click="userLogOff" v-if=!isNotLoggedIn>Uitloggen</button>
            <label v-if=!isNotLoggedIn><font color="white">Welkom, {{ loginName }}</font></label>
            </header>
        </div>      
    `,
    computed: {
    },
    methods: { 
        checkUser(){
            this.loginName = localStorage["username"]
            if (localStorage.length !=0) {
                this.isNotLoggedIn = false
            }
            if (this.loginName ==="damian"){
                this.isAdmin = true;
            }else{
                this.isAdmin = false;
            }
           
        }, 
        adminRights(){
            this.checkUser();
            this.$emit('admin-confirmed'); 
        },
        getPlayedMatches(){
            this.checkUser();
            this.$emit('get-played-matches'); 
        },
        showPlayedMatches(){
            this.checkUser();
            this.$emit('show-played-matches'); 
        },
        showRegisterUser(){
            this.checkUser();
            this.$emit('show-register-user'); 
        },
        showUserLogin(){
            this.checkUser();
            this.$emit('show-user-login'); 
        },
        showMatchesToPredict(){
            this.checkUser();
            this.$emit('show-matches-to-predict'); 
        },
        userLogOff(){
            this.loginName = ""
            if(localStorage.length != 0){
            localStorage.clear();
            this.checkUser();
            location.reload();
            this.$emit("user-log-off");
            }
        },
        showMyPredictions(){
            this.checkUser();
            this.userName = localStorage["username"]
            this.$emit('show-my-predictions', this.userName);
        },
        showLeaderboard(){
            this.checkUser();
            this.userName = localStorage["username"]
            this.$emit('show-leaderboard');
        },
        userLogin(){
            this.checkUser();
            this.$emit('user-login', this.userName, this.password)
            this.checkUser();
        }
    }
}