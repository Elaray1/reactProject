import React, {PureComponent} from 'react'
import './style.css'

function isEmpty(str) {
  if (str.trim() === '')
    return true;

  return false;
}

// function isInteger(num) {
//   //проверка на целочисленность
//   return (num ^ 0) === num;
// }


// function isNumeric(n) {
//
//    return !isNaN(parseFloat(n)) && isFinite(n);
//
//    // Метод isNaN пытается преобразовать переданный параметр в число.
//    // Если параметр не может быть преобразован, возвращает true, иначе возвращает false.
//    // isNaN("12") // false
// }

function roundPlus(x, n) { //x - число, n - количество знаков
  if(isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10,n);
  return Math.round(x*m)/m;
}

class Subscriber extends PureComponent {
  state = {
    isOpen: true,
    isEdit: false,
    isVoting: false,
    isComments: false,
    newComment: false,
    commentError: false,
    comments: []
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  edit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
  }
  voting = () => {
    this.setState({
      isVoting: !this.state.isVoting
    })
  }
  votingSave = () => {
    this.props.subscriber.appearance = (Number(document.getElementById('selectAppearance').value) + this.props.subscriber.appearance * this.props.subscriber.votes) / (this.props.subscriber.votes + 1);
    this.props.subscriber.intellect = (Number(document.getElementById('selectIntellect').value) + this.props.subscriber.intellect * this.props.subscriber.votes) / (this.props.subscriber.votes + 1);
    this.props.subscriber.votes += 1;

    this.props.subscriber.appearance = roundPlus(this.props.subscriber.appearance, 2);
    this.props.subscriber.intellect = roundPlus(this.props.subscriber.intellect, 2);

    this.setState({
      isVoting: !this.state.isVoting,
      errorVoting: false
    })
  }
  save = () => {
    this.props.subscriber.description = document.getElementById('newTxt').value;
    this.props.subscriber.img = document.getElementById('newImg').value;
    this.setState({
      isEdit: !this.state.isEdit
    })
  }
  comments = () => {
    this.setState({
      isComments: true
    })
  }
  addComment = () => {
    this.setState({
      isComments: false,
      newComment: true
    })
  }
  saveComment = () => {
    if (!isEmpty(document.getElementById('newComment').value)) {
    this.state.comments.unshift(document.getElementById('newComment').value);
    this.setState({
      isComments: true,
      newComment: false,
      comments: this.state.comments,
      commentError: false
      })
    } else {
      this.setState({
        commentError: true
      })
    }
  }
  returnToProfile = () => {
    this.setState({
      isComments: false
    })
  }
  render() {
    const {subscriber} = this.props;

    const commentError = this.state.commentError && <div className="alert alert-danger error-border">
    <span className="span-error-border">Пустое поле!</span>
    </div>

    const commentElements = this.state.comments.map((comment) =>
    <div className="card border-dark mb-3 comment-form">
      <div className="card-body text-dark">
      {comment}
      </div>
    </div>);

    const newComment = this.state.newComment && <div>
      <div class="form-group">
          <textarea className="form-control new-comment-ta" id="newComment" rows="3" placeholder="Ваш комментарий..."></textarea>
          {commentError}
          <button type="button" className="btn btn-outline-dark btn-lg btn-outline-dark-newComment" onClick={this.saveComment}>Добавить</button>
      </div>
    </div>

    const comments = this.state.isComments && <div>
      <button type="button" className="btn btn-outline-success btn-lg btn-outline-secondary-comments btn btn-outline-success-comments" onClick={this.addComment}>
      <i className="fa fa-envelope" aria-hidden="true"></i>
      <span className="space-left">Новый комментарий</span></button>
      <hr />
      {commentElements}
      <hr />
      <button type="button" className="btn btn-outline-primary btn-lg btn-outline-secondary-comments btn btn-outline-primary-comments" onClick={this.returnToProfile}>
      <i class="fa fa-user-circle" aria-hidden="true"></i>
      <span className="space-left">Профиль</span></button>
    </div>

    const voting = this.state.isVoting && this.state.isOpen && <div>
    <img src={subscriber.img} className="subscriber-image rounded-circle" alt="1"/>
    <div className="characteristic">
    <div className="form-group">
        <label for="selectAppearance">Внешность</label>
        <select className="form-control" id="selectAppearance">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option selected>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
    </div>
    <div className="form-group">
        <label for="selectIntellect">Интеллект</label>
        <select className="form-control" id="selectIntellect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option selected>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
    </div>
    </div>
    <button className="btn btn-info btn-lg" onClick={this.votingSave}>Оценить
    </button>
    <button className="btn btn-dark btn-lg float-right" onClick={this.voting}>Отмена</button>
    </div>

    const editing = this.state.isEdit && this.state.isOpen && <div>
    <div className="edditing-img">
    <img src={subscriber.img} className="subscriber-image rounded-circle" alt="1"/>
    <textarea rows="1" className="edding-img-img" defaultValue={subscriber.img} id="newImg"></textarea>
    </div>
    <textarea rows="3" className="form-control edding-textarea" defaultValue={subscriber.description} id="newTxt"></textarea>
    <button className="btn btn-info btn-lg edding-button" onClick={this.save}>Сохранить</button>
    </div>

    const description = !this.state.isEdit && this.state.isOpen && !this.state.isVoting && !this.state.isComments && !this.state.newComment && <div>
    <div>
    <img src={subscriber.img} className="subscriber-image rounded-circle" alt="1"/>
    <button type="button" className="btn btn-outline-secondary btn-lg btn-outline-secondary-comments" onClick={this.comments}>
    <i class="fa fa-comments-o" aria-hidden="true"></i>
    <span className="space-left">Комментарии</span></button>
    </div>
    <div className="characteristic">
    <span>Внешность: <span className="mark1">{subscriber.appearance}</span></span> <br />
    <span>Интеллект: <span className="mark1">{subscriber.intellect}</span></span> <br />
    <span>Количество голосов: <span className="mark1">{subscriber.votes}</span></span>
    </div>
    <section className="card-text description">{subscriber.description}</section>
    <button className="btn btn-danger btn-lg voting-button" onClick={this.voting}><span className="space-right">Оценить</span>
    <i className="fa fa-hand-o-up" aria-hidden="true"></i>
    </button>
    <button className="btn btn-warning btn-lg edding-button float-right" onClick={this.edit} style={{color: "white"}}>
    <i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
    Изменить</button>
    </div>
    return (
      <div className="card mx-auto" style={{width: "50%"}}>
        <div className="card-header">
          <h2>
            {subscriber.name} {subscriber.surname}
            <button onClick={this.handleClick} className="btn btn-primary btn-lg float-right">
            {this.state.isOpen ? 'close' : 'open'}
            </button>
          </h2>
          <h6 className="card-subtitle text-muted" >
            Пол: {subscriber.gender}
          </h6>
        <div className="card-body">
          {comments}
          {newComment}
          {voting}
          {editing}
          {description}
        </div>
        </div>
      </div>
    )
  }
}

export default Subscriber
