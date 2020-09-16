import React from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import Firebase from "./config";


const required = (val) => val && val.length;   
const maxLength = (len) => (val) => !(val) || (val.length <= len); 
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val)) ;  
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Form extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        form: [],
        alert: false,
        alertData: {}
      };
    }
  
    showAlert(type, message) {
      this.setState({
        alert: true,
        alertData: { type, message }
    });

    setTimeout(() => {
      this.setState({ alert: false });
      }, 4000)
    }
    
    resetForm() {
      this.refs.contactForm.reset();
    }

    componentWillMount() {
    let formRef = Firebase.database().ref('form').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { name, email, contact, description } = snapshot.val();
      const data = { name, email, contact, description };
      this.setState({ form: [data].concat(this.state.form) });
    })
   }

   sendMessage() {
    //e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,
      contact: this.inputContact.value,
      description: this.inputDescription.value,

    };

    if (params.name && params.email && params.contact && params.description) {
      Firebase.database().ref('form').push(params).then(() => {
        this.showAlert('Success', 'Your message was sent successfull');
      }).catch(() => {
        this.showAlert('Danger', 'Your message could not be sent');
      });
      this.resetForm();
    } else {
      this.showAlert('Warning', 'Please fill the form');
    };
  }

    render(){

    return(

        <div className="container">

            <div>
               {this.state.alertData.message}
            </div>

        <div className="row row-content">
            <div className="col-12">
                <h3>Form</h3>
            </div>
      
            <div className="col-12 col-md-9">
            <LocalForm onSubmit={() => this.sendMessage()} id="submitForm" ref='contactForm'>
            
            <Row className="form-group">
                <Label htmlFor="name" >Name</Label>  
                <Col>
                <Control.text model=".name" id="name" name="name"  ref={name => this.inputName = name} 
                    placeholder="Name"
                    className="form-control"         // Bootstrap Styling for our control
                    validators={{
                        required, minLength: minLength(1), maxLength: maxLength(24)
                    }}
                />
                  <Errors
                        className="text-danger"   // Renders in Red Color.
                        model=".name"
                        show="touched"   // If a field is touched then only show errors.
                        messages={{
                            required: 'Required: ',
                            minLength: 'must be 1 or more characters',
                            maxLength: 'must be 24 characters or less'
                        }}
                  />
                  </Col>
              </Row>
      
              <Row className="form-group">
                  <Label htmlFor="email">Email</Label>
                  <Col>
                  <Control.text model=".email" id="email" name="email"  ref={email => this.inputEmail = email}
                        placeholder="Email"
                        className="form-control"  
                        validators={{
                            required, validEmail
                        }}
                  />
                  <Errors
                        className="text-danger"
                        model=".email"
                        show="touched"
                        messages={{
                            required: 'Required: ',
                            validEmail: 'invalid email address'
                        }}
                  />
                  </Col>
              </Row>
      
              <Row className="form-group">
                  <Label htmlFor="phonenum" md={2}>Contact</Label>
                  <Col>
                  <Control.text model=".phonenum" id="phonenum" name="phonenum"  ref={contact => this.inputContact = contact}
                        placeholder="Phone number"
                        className="form-control"  
                        validators={{
                            required, minLength: minLength(10), maxLength: maxLength(15), isNumber
                        }}
                  />
                  <Errors
                        className="text-danger"
                        model=".telnum"
                        show="touched"
                        messages={{
                            required: 'Required: ',
                            minLength: 'not less than 10 numbers',
                            maxLength: 'not more than 15 numbers with code',
                            isNumber: 'must be a number'
                        }}
                   />
                  </Col>
              </Row>
              <div className="left-right" >
              <Row className="row-content-less">
                <Label>Gender  </Label>
                  <Label>
                    <input
                        name="gender"
                        component="input"
                        type="radio"
                        value="male"
                    />{' '}
                    Male
                </Label>
      
                <Label>
                    <input
                        name="gender"
                        component="input"
                        type="radio"
                        value="female"
                    />{' '}
                    Female
                </Label>
              </Row>
              <Row className="row-content-less">
                <Label>  Skills  
                <select className="select">
                    <option value="UI">UI</option>
                    <option value="UX">UX</option>
                    <option value="Backend">Backend</option>
                    <option value="CSS">CSS</option>
                </select>
                </Label>
              </Row>
              </div>
              <Row className="form-group">
              <Label htmlFor="message" >Description</Label>
              <Col>
                    <Control.textarea model=".message" id="description" name="message" ref={description => this.inputDescription = description}
                       rows="12"
                       className="form-control"
                    />
              </Col>
              </Row>
      
              <Row className="row-content-less" >
                  <Button className="submit-button" type="Submit">
                       Submit
                  </Button>
              </Row>
            </LocalForm>
            </div>
          </div>
      
        </div>
    )
    }
}

export default Form;
  

