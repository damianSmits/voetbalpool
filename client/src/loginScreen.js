export default {
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
}