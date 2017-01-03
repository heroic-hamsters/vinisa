import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

export default class Library extends React.Component {
  constructor(props) {
    super(props)
  }

  onWordSelect(event) {
    event.persist();
    event.preventDefault();
    browserHistory.push('/library/'+event.target.innerText);
    $.ajax({
      url: "/singleword",
      context: event.target.innerText
    }).done(()=>{
      console.log('seleted word:', event.target.innerText)
    });
  }

  render() {
    return (
      <div>
        <h1>My Library</h1>
        {this.props.route.data.map((sample)=>(
          <ul key={sample.id}>
            <li onClick={this.onWordSelect.bind(this)}>{sample.word.split(' ')[0]}</li>
            <div>{sample.sentence}</div>
          </ul>
        ))}
        {this.props.children}
      </div>
    )
  }
}