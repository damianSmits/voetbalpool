Vue.component('links', {
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
            <button v-on:click="showRegisterUser">Registreer</button>
            <button v-on:click="showMatchesToPredict">voorspel komende potjes</button>
            <button v-on:click="showMyPredictions">Mijn voorspellingen</button>
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
                userName = localStorage["username"]
            }
            this.$emit('show-my-predictions', userName);
        }
    },       
 });

Vue.component('admin-screen', {
    props: [ 'matches' ],
    data() {
        return {
            teamName: undefined,
            homeTeam:"",
            awayTeam:"",
            awayGoals:"",
            homeGoals:"",
            round:0,
            roundThatHasBeen:0,
            errorMessage: "",
        }
    },
    
    template: `
        <div>
            </br> {{ errorMessage }} </br>
            Voeg Team toe
            </br><input placeholder = 'naam' v-model="teamName"/>
           
            </br><button v-on:click="confirmTeam">Stort</button>
            </br>
            </br></br>

            Kan ook wel wedstrijd toevoegen als je wilt
            </br><input placeholder = 'Thuisteam' v-model="homeTeam"/>
            </br><input placeholder = 'Uitteam' v-model="awayTeam"/>
            </br><input placeholder = 'Speelronde' v-model="round" min = 0 step =1/>Speelronde
            </br><button v-on:click="confirmMatch">Stort</button>
            
            </br></br>

            Of missschien uitslagen invullen van speelronde:
            </br><input placeholder = 'round' v-model="roundThatHasBeen" min = 0 step =1/>
            </br><button v-on:click="showMatches">Laat zien dan</button>
            
            </div>
    `,
    methods: {
        confirmTeam() {
            if (!this.teamName) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }

            this.errorMessage = "";
            this.$emit('team-confirmed', this.teamName);                 
        },
        confirmMatch() {
            if (!this.homeTeam || !this.awayTeam) {
                this.errorMessage = "wel team naam toevoegen";
                return;
            }

            this.errorMessage = "";
            this.$emit('match-confirmed', this.homeTeam, this.awayTeam, this.round);                 
        },
        showMatches() {
            if (!this.roundThatHasBeen) {
                this.errorMessage = "wel speelronde toevoegen";
                return;
            }
            this.errorMessage = "";
            this.$emit('show-matches', this.roundThatHasBeen);
        }
    }
});

 Vue.component('matches-screen', {
    props: [ 'playedMatches' ],
    data() {
        return {  
               
        }
    },
    
    template: `
        <div>
                <li v-for="match in playedMatches">
                    {{ match["homeTeam"] }} vs. {{ match["awayTeam"] }}&nbsp;&nbsp;
                    {{ match["homeGoals"] }}-{{ match["awayGoals"] }}
                </li>
        </div>
    `,
    methods: {   
    }
 });
 

 Vue.component('fill-in-results-screen', {
    props: [ 'matches' ],
    data() {
        return {  
               homeTeam: "",
               awayTeam: "",
               homeGoals: 0,
               awayGoals: 0
        }
    },
    
    template: `
        <div>
                <li v-for="match in matches">
                    <label>{{ match["homeTeam"] }}</label> 
                    <input min = 0 step =1 size="1">-
                    <input min = 0 step =1 size="1"> 
                    <label>{{ match["awayTeam"] }}</label>&nbsp;&nbsp;
                    <button v-on:click="sendMatchResults">Stort</button> 
                </li>
        </div>
            
    `,
    methods: { 
        sendMatchResults(){
            console.log(event.target.parentNode.children[3].value)
            this.$emit("give-results-to-matches", event.target.parentNode.children[0].innerHTML, event.target.parentNode.children[3].innerHTML, event.target.parentNode.children[1].value, event.target.parentNode.children[2].value)
        }  
    }
 });


 Vue.component('register-screen', {
    data() {
        return {  
               userName: "",
               password: "",
               email:""
        }
    },
    
    template: `
        <div>
            <input v-model="userName" placeholder ="user name" ></br>
            <input v-model="password" placeholder ="password" type ="password"></br>
            <input v-model="email" placeholder ="email" >
            <button v-on:click="registerpls">Registreer</button>
        </div>
            
    `,
    methods: { 
        registerpls(){
            console.log()
            this.$emit("register-user", this.userName, this.password, this.email)
        }  
    }
 });


 Vue.component('login-screen', {
    data() {
        return {  
               userName: "",
               password: "",
               errorMessage: "",
        }
    },
    
    template: `
        <div>
            <input v-model="userName" placeholder ="user name" ></br>
            <input v-model="password" placeholder ="password" type ="password"></br>
            <button v-on:click="logIn">Log in</button>

            {{ errorMessage }}
        </div>
            
    `,
    methods: { 
        logIn(){
            console.log()
            this.$emit("user-login", this.userName, this.password, this.errorMessage)
        }  
    }
 });

 Vue.component('predict-screen', {
    props: [ 'matchesToPredict' ],
    data() {
        return {  
               homeGoals: undefined,
               awayGoals: undefined,
               homeTeam: undefined,
               awayTeam: undefined,
               ronde:false,
               errorMessage:"",
        }
    },
    
    template: `
        <div>
            <button v-on:click="startMatchPrediction">haal wedstrijden op</button>
            </br></br>{{ errorMessage }}</br></br>
            
            <li v-for="match in matchesToPredict">
                    {{ match["round"] }}: <label>{{ match["homeTeam"] }}</label> 
                    <input min = 0 step =1 size="1"> -
                    <input min = 0 step =1 size="1"> 
                    <label>{{ match["awayTeam"] }}</label>&nbsp;&nbsp;
                    <button v-on:click="sendPrediction">voorspel!</button>
                </li>
        </div>
            
    `,
    methods: { 
        startMatchPrediction(){
            this.$emit("predict-matches")
        },
        sendPrediction(){
            if(localStorage.length == 0){
                this.errorMessage = "bennie ingelogd"
            } else{
                console.log(event.target.parentNode.children[1].value)
                this.$emit("send-prediction", event.target.parentNode.children[1].value, event.target.parentNode.children[0].innerHTML, 
                event.target.parentNode.children[3].innerHTML, event.target.parentNode.children[2].value, localStorage["username"])
            }
        }    
    }
 });

 Vue.component('my-predictions-screen', {
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
 });

const app = new Vue({
el: '#app',

data: {
    haveAdminRights: false,
    showPlayed: false,
    matches: [],
    playedMatches: [],
    showMatchesForResult: false,
    showRegisterForm: false,
    showUserLogin: false, 
    predictMatches: false,
    matchesToPredict: [],
    errorMessage: "",
    showMyPredictions: false,
    myPredictions: [],
    isAdmin: false,
},

computed: {
    
},
methods: {
    hideAllScreens(){
        this.haveAdminRights=false;
        this.showPlayed=false;
        this.showMatchesForResult=false;
        this.predictMatches=false;
        this.showRegisterForm = false;
        this.showUserLogin= false;
        this.predictMatches = false;
        this.showMyPredictions = false;
    },
    async goToAdmin(){
        this.hideAllScreens();
        if(localStorage.length != 0 && localStorage["username"] === "admin"){
            this.haveAdminRights= !this.haveAdminRights
        } else {
            alert("volgens mij ben jij helemaal geen admin")
        }
        return this.haveAdminRights 
    },
    async goToRegister(){
        this.hideAllScreens();
        this.showRegisterForm= !this.showRegisterForm
        return this.showRegisterForm 
    },
    async goToLogin(){
        this.hideAllScreens();
        this.showUserLogin= !this.showUserLogin
        return this.showUserLogin 
    },
    async showPlayedMatchespls(){
        this.hideAllScreens();
        this.showPlayed= !this.showPlayed;
        return this.showPlayed; 
    },
    async goToPredictMatches(){
        this.hideAllScreens();
        this.predictMatches= !this.predictMatches;
        return this.predictMatches; 
    },
    async goToMyPredictions(){
        this.hideAllScreens();
        this.showMyPredictions= !this.showMyPredictions;
        return this.showMyPredictions; 
    },
    async addTeam(teamName){
        console.log(teamName);
        let newTeam = {"teamName": teamName}
        await fetch('api/addTeam', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeam)  
        })
    },
    async addMatch(homeTeam, awayTeam, round){
        console.log(homeTeam + "" + awayTeam + "" + round);
        let newMatch = {
            "homeTeam": homeTeam,
            "awayTeam": awayTeam,
            "round": round
    }
        await fetch('api/addMatch', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMatch)  
        })
    },
    async getMatchesToGiveResult(roundThatHasBeen){
        let newRoundThatHasBeen= {"round": roundThatHasBeen}
        let response = await fetch('api/showMatch/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRoundThatHasBeen) 
        })
        let matches = await response.json();
        this.matches=matches;
        console.log(matches);
        this.showMatchesForResult= !this.showMatchesForResult;
        return this.showMatchesForResult; 
    },

    async getPlayedMatches(){
        let response = await fetch('/api/getPlayed/', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        playedMatches = await response.json();
        this.playedMatches=playedMatches;
        console.log(playedMatches);
        this.showPlayedMatchespls();

    },
    async sendResults(homeTeam, awayTeam, homeGoals, awayGoals){
        let newMatchToGiveResult = {
            "homeTeam": homeTeam,
            "awayTeam": awayTeam,
            "homeGoals": homeGoals,
            "awayGoals": awayGoals
         }
        let response = await fetch('/api/sendResults/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMatchToGiveResult)
        })
        playedMatches = await response.json();
        console.log(playedMatches);
    },
    async registerUser(userName, password, email){
        console.log(userName + "" + password + "" + email);
        let newUser = {
            "userName": userName,
            "password": password,
            "email": email
    }
        await fetch('api/registerUser', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)  
        })
    },
    async userLogin(userName, password){
        let newLogin= {
            "userName": userName,
            "password": password
        }
        let response = await fetch('api/userLogin', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLogin) 
        })
        let userLoggingIn = await response.json()
        console.log(userLoggingIn)
        if(userLoggingIn !== "NEE"){
            localStorage.setItem("username", userLoggingIn)
            alert("Jeuu " + userLoggingIn);
        } else {
        alert("flauwekul ingevuld")
        }
        if (localStorage["username"] === "admin"){
            this.isAdmin = true;
        }
    },
    async showMatchesToPredict(){
        let response = await fetch('api/getMatchesToPredict/', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        matchesToPredict = await response.json();
        this.matchesToPredict = matchesToPredict;
        console.log(matchesToPredict);
    },
    async sendMatchPrediction(homeGoals, homeTeam, awayTeam, awayGoals){
        let newPrediction = {
            "homeGoals": homeGoals,
            "homeTeam": homeTeam,
            "awayGoals": awayGoals,
            "awayTeam": awayTeam,
            "userName": localStorage["username"]
        }
        await fetch('api/sendMatchPrediction/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPrediction)
        })
    },
    async getMyPredictions(userName){
        console.log(userName)
        let newMyPredictions = {"userName": userName};
        let response = await fetch('api/getMyPredictions/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMyPredictions)
        })
        myPredictions = await response.json();
        this.myPredictions = myPredictions;
        console.log(myPredictions);
        this.goToMyPredictions();
    },
},  
})            
