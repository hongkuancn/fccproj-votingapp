import React from "react";

class NewpollPage extends React.Component {
  state = {
    topic: '',
    options: ``
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="container-fluid">
        <div className="form-group">
          <label>New Poll</label>
          <input type="text" className="form-control" name="topic" value={this.state.topic} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label>Options</label>
          <textarea value={this.state.options} className="form-control" name="options" onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
};

export default NewpollPage;
