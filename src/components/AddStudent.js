import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state ={open: false, student:{name: '', email: '', statusCode: ''} };

  };

  handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  //Enter the input values into component state info on field change
  handleChange = (event) => {
    this.setState({student:{name: event.target.value}});
    this.setState({student:{email: event.target.value}});

    this.setState({student:{statusCode: 0}});
  }

  //Saving the changes and close modal form
  handleAdd = () => {
    this.props.AddStudent(this.state.student);
    this.handleClose();
  }

 addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');

    fetch(`${SERVER_URl}/addStudent`,
    {
        method:'POST',
        headers: {'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token },
        body: JSON.stringify(student)
 }).then(res => {
    if (res.ok){
        TransformStream.success("Successfully added!", {
            position: TransformStream.position.bottom_left
        });
    } else {
        TransformStream.error("Error! Couldn't Add Student", {
            position: TransformStream.position.bottom_left
        });
        console.error('Post http status =' + res.status);
    }})
    .catch(err1 => {
        TransformStream.error("Error! Couldn't Add Student", {
            position: TransformStream.position.bottom_left
        });
        console.error(err1);
    })
}

render(){
    return(<div>
        <Button id="addStudent" variant="outlined" color="default" style={{margin: 20}} onClick={this.handleClickOpen}>
            Add Student
        </Button>
        <Button id="home" component={Link} variant="outlined" color="default" style={{margin: 20}} to={{pathname: '/'}}>
            Home
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent style={{paddingTop: 25}}>
                <TextField autoFocus fullWidth id="name" label="Student name" name="student_name" onChange={this.handleChange}/>
                <TextField autoFocus fullWidth id="email" label="Student email" name="student_email" onChange={this.handleChange}/>
                </DialogContent> 
        <DialogActions>
            <Button id="Add" color="default" onClick={this.handleAdd}>Add</Button>
            <Button id="Cancel" color="secondary" onClick={this.handleClose}>Cancel</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
  }
}

AddStudent.PropTypes = {
    addStudent: PropTypes.func.isRequired
}
export default AddStudent;