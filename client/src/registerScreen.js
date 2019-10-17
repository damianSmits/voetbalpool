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
            </br><button v-on:click="registerpls">Registreer</button>
        </div>
            
    `,
    methods: { 
        registerpls(){
            this.$emit("register-user", this.userName, this.password, this.email)
        }  
    }
}