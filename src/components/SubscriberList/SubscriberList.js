import React, {Component} from 'react'
import Subscriber from '../Subscriber/Subscriber'
import './style.css'

export default class ArticleList extends Component {
  render() {
    const subscribersElements = this.props.subscribers.map((subscriber, index) =>
    <li className="subscriber-list__li">
      <Subscriber subscriber={subscriber}
       />
    </li>
  )
  return (
    <ul>
      {subscribersElements}
    </ul>
  )
  }
}
