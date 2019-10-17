Vue.component('links', (resolve) => {
    import('./links.js')
    .then((links) => {
      resolve(links.default);
    });   
});

Vue.component('admin-screen', (resolve) => {
    import('./adminScreen.js')
    .then((adminScreen) => {
      resolve(adminScreen.default);
    });   
});

 Vue.component('matches-screen', (resolve) => {
    import('./matchScreen.js')
    .then((matchScreen) => {
      resolve(matchScreen.default);
    });   
});
 

Vue.component('fill-in-results-screen', (resolve) => {
    import('./fillInResultsScreen.js')
    .then((fillInResultsScreen) => {
      resolve(fillInResultsScreen.default);
    });   
});

Vue.component('register-screen', (resolve) => {
    import('./registerScreen.js')
    .then((registerScreen) => {
      resolve(registerScreen.default);
    });   
});

Vue.component('predict-screen', (resolve) => {
    import('./predictScreen.js')
    .then((predictScreen) => {
      resolve(predictScreen.default);
    });   
});

Vue.component('my-predictions-screen', (resolve) => {
    import('./myPredictionsScreen.js')
    .then((myPredictionsScreen) => {
      resolve(myPredictionsScreen.default);
    });   
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
    predictMatches: false,
    matchesToPredict: [],
    errorMessage: "",
    showMyPredictions: false,
    myPredictions: [],
    isAdmin: false,
    userName:""
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
   
    async showPlayedMatchespls(){
        this.hideAllScreens();
        this.showPlayed= !this.showPlayed;
        return this.showPlayed; 
    },
    async goToPredictMatches(){
        this.showMatchesToPredict();
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
        this.showMatchesForResult= true;
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
    async sendResults(homeTeam, awayTeam, homeGoals, awayGoals, round){
        let newMatchToGiveResult = {
            "homeTeam": homeTeam,
            "awayTeam": awayTeam,
            "homeGoals": homeGoals,
            "awayGoals": awayGoals,
            "round":round
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
        alert("welkom!")
        this.hideAllScreens();
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
            this.hideAllScreens();
            this.userName=userLoggingIn;
            location.reload();
        } else {
        alert("flauwekul ingevuld")
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
