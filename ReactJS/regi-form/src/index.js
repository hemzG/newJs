import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import Header from './header';
import './style.css'
import './App.css';
import reportWebVitals from './reportWebVitals';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    var formName=this.state.firstName;
    var formEmail= this.state.email;
    var formPhone =this.state.phoneNumber;
    var formMessage=this.state.message;
    var valEmail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

    if(formName == undefined){
      document.getElementById('name-error').innerHTML = "Please enter name";
    }else{
      document.getElementById('name-error').innerHTML = "";
      }

      if (formEmail == undefined || !valEmail.test(formEmail)) {
        document.getElementById('email-error').innerHTML = "Please enter correct email id";
  }
  else{
  document.getElementById('email-error').innerHTML = "";
  }
  
  if(formPhone == undefined){
    document.getElementById('phone-error').innerHTML = "Please enter phone number";
  }else{
    document.getElementById('phone-error').innerHTML = "";
    }
    if(formMessage == undefined){
      document.getElementById('message-error').innerHTML = "Please enter message";
    }else{
      document.getElementById('message-error').innerHTML = "";
      }



   //alert('A name was submitted: ' + this.state.value);
   event.preventDefault();
  }
  render() {
    return (
      <div>
      <div className="form">
      <form id = "valform" onSubmit={this.handleSubmit}>
        <div className="form-body">
        <div>
        <label className='form_label'>Name:
          <input type="text" className="form_input" name= "firstName" value={this.state.firstName} onChange={this.handleInputChange} placeholder="Name" />
        </label>
        <div id="name-error" className ="errorclass"></div>
        </div>
        <div>
          <label className='form_label'>Email:
          <input type="text" className="form_input" name= "email" value={this.state.email} onChange={this.handleInputChange} /> </label>
          <div id="email-error"  className ="errorclass"></div>
          </div>
        <div>
        <label className='form_label'>Phone Number:
          <input type="number" className="form_input" name= "phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange}/>
        </label>
        <div id="phone-error"  className ="errorclass"></div>
        </div>
        <div>
        <label className='form_label'>Message:
          <textarea className="form_input" name= "message" value={this.state.message} onChange={this.handleInputChange} />
        </label>
        <div id="message-error"  className ="errorclass"></div>
        </div>
        </div>
        <div className="footer">
          <input type="submit" value ="submit"></input>
           
          </div>
      </form>
      </div>
      <div>
      <CopyForm name= {this.state.firstName} email = {this.state.email} phoneNumber={this.state.phoneNumber} message={this.state.message}/>

      </div>
      </div>
    );
  }
}

function CopyForm(props){
  


  return(
    <div>
   <h2>{props.name}</h2> 
   <h2>{props.email}</h2>
   <h2>{props.phoneNumber}</h2> 
   <h2>{props.message}</h2>
   </div>
  );


}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <div className="App"> <Header/></div>
  <NameForm />
</>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
