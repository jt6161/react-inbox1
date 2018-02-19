import React, { Component } from 'react'

class Toolbar extends Component {

  render() {

    let selectButtonClass = "fa-square-o";

    let messagesSelected = this.props.messages.filter(message => message.selected);

    if (messagesSelected.length === this.props.messages.length) {
      selectButtonClass = "fa-check-square-o";
    } else if (messagesSelected[0]) {
      selectButtonClass = "fa-minus-square-o";
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
              unread messages
          </p>

          <a className="btn btn-danger" onClick={this.props.toggleComposeForm}>
            <i className="fa fa-plus"></i>
          </a>

          <button
            className="btn btn-default"
            onClick={() => this.props.selectButtonFunc(selectButtonClass)}>

            <i className={`fa ${selectButtonClass}`}></i>
          </button>

          <button className="btn btn-default">Mark As Read</button>

          <button className="btn btn-default">Mark As Unread</button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button
            className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
      </div>
    </div>
    )
  }
}

export default Toolbar;
