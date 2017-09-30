import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3030/');

class Message extends Component{
  render(){
    return(
      <div>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount(){
    socket.on('newMessage', (message)=>{
      this.setState({messages: this.state.messages.concat(message)});
      console.log(this.state.messages);
    });
  }

  receiveNewMessage(){
    var message = document.getElementById('message').value;
    socket.emit('newMessage', message);
  }

  render(){
    let p = [];
    this.state.messages.forEach((msg, i)=>{
      p.push(<Message data={msg} key={i}/>);
    });
    return(
      <div>
        <input type="text" id="message"/>
        <button onClick={this.receiveNewMessage.bind(this)}>Send</button>
        {p}
      </div>
    );
  }
}

export default App;