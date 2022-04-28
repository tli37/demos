import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userid: null,
            username: "",
            storageid: null,
            storageuser: ""
           
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //alot of this stuff doesnt show when using
    //because of the "Auto login" in Hackermanlogin()
    //when submitting a login
    handleSubmit (event) {
        event.preventDefault();
        var form = event.target

        let data;
        axios.post('http://localhost:8000/login/',
            {
                username: form.username.value,
                password: form.password.value
            }

        )
        .then( res =>{
            data = res.data;
            console.log("hehe")
            console.log(res)

            localStorage.setItem('id', data.id)
            localStorage.setItem('user', data.username)
         })
          .catch(err => {})
        
        this.checkUser();
            
        
    }

    hackermanlogin(){ //auto login... 
        let data;
        axios.post('http://localhost:8000/login/',
            {
                username: "admin",
                password:  "123"
            }
        )
        .then( res =>{
            data = res.data;
            console.log(res)
            //check if id it returned a number (anonymous user is null)
            if (isNaN(data.id)=== false){
                this.setState({
                    userid: data.id,
                    username: data.username
                  });

                localStorage.setItem('id', data.id)
                localStorage.setItem('user', data.username)
                
              }

          })

    }


    checkUser(){ //check user function that used to be in a button for me to check

        let data;
        axios.get('http://localhost:8000/login/')
        .then( res =>{
          data = res.data;
            
          console.log(res)
          
            //check if id it returned a number (anonymous user is null)
          if (isNaN(data.id)=== false){
            this.setState({
                userid: data.id,
                username: data.username
              });
          }
           
        })
        .catch(err => {})
    }

    componentDidMount() {
        this.hackermanlogin();
        this.checkUser();
    }

        
 render(){ 
    
    return (
        <div className='row'>
            <div className='col login'>
                
                {/* check if a user is logged in, else return login form*/}
                {this.state.userid !== null ? 
                    "Current user: "+this.state.username : 
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name= "username" placeholder='username'/>
                            <br/>
                            <input type="text" name= "password" placeholder='password'/>
                            <br/>
                            <input type="submit"/>

                        </form>
                    }

            </div>

        </div>
          
        
        );
            
    }
}


export default Login;

