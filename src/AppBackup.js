import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm'
import axios from 'axios'

class App extends Component {

state = {
  messages: [],
  showCompose: false
  }

  componentDidMount = async () => {
    let messages = await axios.get(`http://localhost:8000/messages`)
    this.setState({ messages: messages.data })
  }

  addMessage = (message) => {
    let newMessage = {
      ...message,
      labels: JSON.stringify([]),
      read: false,
      selected: false,
      starred: false
    }
    let newMessages = await axios.post(`http://localhost:8000/messages`, newMessage)
    this.setState({ messages: newMessages.data })
  }

  toggleComposeForm = () => {
    this.setState({ showCompose: !this.state.showCompose })
  }

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

setUnreadFunc = () => {
  let newState = this.state.messages.map(msg => {
    if(msg.selected) msg.read = true
    return msg;
  })
  this.setState({ messages: newState });
}

setReadFunc = () => {
  let newState = this.state.messages.map(msg => {
    if(msg.selected) msg.read = true
    return msg;
  })
  this.setState({ messages: newState });
}

deleteMessages = () => {
  let newState = this.state.messages.fitler(msg => !msg.selected);
  this.setState({ messages: newState });
}

addLabel = (label) => {
  console.log('heard', label);
  let newState = this.state.messages.map(msg => {
    if(msg.selected && !msg.labels.includes(label)) msg.labels.push(label)
    return msg
  })
  this.setState({ messages: newState })
}

removeLabel = (label) => {
  let newState = this.state.messages.map(msg => {
    if(msg.selected) msg.labels = msg.labels.filter(l => l !== label)
    return msg
  })
  console.log('heard', newState);
  this.setState({ messages: newState })
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
