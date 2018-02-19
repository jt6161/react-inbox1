import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
// import ComposeForm from './components/ComposeForm'


class App extends Component {

  state = {
    messages: [
      {
  "id": 1,
  "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
  "read": false,
  "starred": true,
  "labels": ["dev", "personal"]
},
{
  "id": 2,
  "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
  "read": false,
  "starred": false,
  "selected": true,
  "labels": []
},
{
  "id": 3,
  "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
  "read": false,
  "starred": true,
  "labels": ["dev"]
},
{
  "id": 4,
  "subject": "We need to program the primary TCP hard drive!",
  "read": true,
  "starred": false,
  "selected": true,
  "labels": []
},
{
  "id": 5,
  "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
  "read": false,
  "starred": false,
  "labels": ["personal"]
},
{
  "id": 6,
  "subject": "We need to back up the wireless GB driver!",
  "read": true,
  "starred": true,
  "labels": []
},
{
  "id": 7,
  "subject": "We need to index the mobile PCI bus!",
  "read": true,
  "starred": false,
  "labels": ["dev", "personal"]
},
{
  "id": 8,
  "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
  "read": true,
  "starred": true,
  "labels": []
}
    ]
    }

  // toggleComposeForm = () => {
  //   this.setState({ showCompose: !this.state.showCompose })
  // }

  toggleRead = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !== message.id)

    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: !selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({ messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
    }

  toggleStarred = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !== message.id)
    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: !selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({ messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
    }

  toggleSelected = (selectedMessage) => {
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !== message.id)
    let changedMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels,
      selected: !selectedMessage.selected || false
    }
    this.setState({ messages: otherMessages.concat(changedMessage).sort((a, b) => a.id - b.id)})
  }

  selectButtonFunc = (type) => {
    console.log('type', type)
    this.setState({
      messages: !this.state.messages.some(msg => msg.selected)
    })
  }

  toolbarCopyCurrentState = () => {
    return this.state.messages.map((message) => {
      return {...message};
    });
  }

  selectButtonFunc = (type) => {

    let messagesStateCopy = this.toolbarCopyCurrentState();

    if (type.includes('check')) {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = false;
        return message;
      });
    } else {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = true
        return message;
      });
    }

      this.setState({ messages: messagesStateCopy });
  }


  render() {
    let numOfSelectedMsgs = this.state.messages.filter(msg => msg.selected).length;
    return (
      <div className="App">
        <Toolbar
          numOfSelectedMsgs={numOfSelectedMsgs}
          messages={this.state.messages}
          selectButtonFunc={this.selectButtonFunc}
          setUnreadFunc={this.setUnreadFunc}
          setReadFunc={this.setReadFunc}
          deleteMessages={this.deleteMessages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
        />
        <MessageList
          messages={this.state.messages}
          toggleRead={this.toggleRead}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}


export default App;
