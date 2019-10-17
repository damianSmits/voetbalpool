export default {
    data() {
        return {
            userName: "",
            loginName: localStorage["username"],
            password:"",
            isAdmin: "loginName==='admin'",
            isNotLoggedIn: "localStorage.length==0" 
        }
    },
    template: `
        <div>
            <button v-on:click="adminRights" v-if=isAdmin>admin</button>    
            <button v-on:click="getPlayedMatches">laat afgelopen potjes zien</button>  
            <button v-on:click="showMatchesToPredict" v-if=!isNotLoggedIn>voorspel komende potjes</button>
            <button v-on:click="showMyPredictions" v-if=!isNotLoggedIn>Mijn voorspellingen</button>
            <button v-on:click="showRegisterUser" v-if=isNotLoggedIn>Registreer</button>
            <input v-model="userName" align="" v-if=isNotLoggedIn></input><input v-model="password" type="password" v-if=isNotLoggedIn></input>
            <button v-on:click="userLogin" v-if=isNotLoggedIn>Inloggen</button>  
            <button v-on:click="userLogOff" v-if=!isNotLoggedIn>Uitloggen</button>
            {{ loginName }} 
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
            if (this.loginName ==="admin"){
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
            alert("k doei")
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
        userLogin(){
            this.checkUser();
            this.$emit('user-login', this.userName, this.password)
            this.checkUser();
        }
    }
}