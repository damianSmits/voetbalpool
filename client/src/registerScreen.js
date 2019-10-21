export default {
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
            <input v-model="email" placeholder ="email">
            </br><button class = "regularButton" v-on:click="registerpls">Registreer</button>
        </div>
            
    `,
    methods: { 
        registerpls(){
            if(this.userName.includes("'")){
                alert("Geen gekke tekens AUB")
            }
            if(!this.userName == "" && !this.email=="" && !this.userName.includes("'")){
                this.$emit("register-user", this.userName, this.password, this.email)
            }
            else {
                alert("Kan geen lege username of e-mail invullen")
            }
        }  
    }
}