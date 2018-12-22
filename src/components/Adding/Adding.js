import React, {Component} from 'react'
import './style.css'
import SubscriberList from '../SubscriberList/SubscriberList'


function isEmpty(str) {
  if (str.trim() === '')
    return true;

  return false;
}

class Adding extends Component {
  state = {
    subscribers: this.props.subscribers,
    isError: false,
  }
  render() {
    const {subscribers} = this.state;
    const error = this.state.isError && <div className="alert alert-danger error-border">
    <span className="span-error-border">Не все формы заполнены</span>
    </div>
    return (
      <div>
      <div className="form-group card custom-form mx-auto" style={{width: "70%"}}>
        <h4>Регистрация:</h4>
        <div><label for="name">Имя</label><input id="name" type="text" placeholder="Имя" className="form-control" /></div>
        <div><label for="surname">Фамилия</label><input id="surname" type="text" placeholder="Фамилия" className="form-control" /></div>
        <div><label for="img">Ава</label><input id="img" type="text" placeholder="Укажите ссылку на аватарку" className="form-control"/></div>
        <div className="radio-gender">
        <h5>Укажите ваш пол</h5>
        <input name="gender" type="radio" value="male" id="gender_male"/><label for="gender_male" className="radio-gender-label">Мужской</label>
        <input name="gender" type="radio" value="female" id="gender_female"/><label for="gender_female" className="radio-gender-label">Женский</label>
        </div>
        <div><label for="description">О себе</label><input id="description" type="text" placeholder="О себе" className="form-control"/></div>
        {error}
        <button  id="accButton" type="button" name="button" className="btn btn-success" onClick={this.creatingAcc}>Создать</button>
      </div>
      <div className="form-group card custom-form mx-auto sort-title" style={{width: "50%"}}>
        <div className="form-group">
            <h3><label for="sorting" className="sort-title2">Сортировка</label></h3>
            <select className="form-control" id="sorting">
                  <option>По красоте</option>
                  <option>По интеллекту</option>
                  <option>По фамилии</option>
            </select>
            <button className="btn btn-primary btn-lg sort-button" onClick={this.sorting}>Сортировать</button>
        </div>
      </div>
      <SubscriberList subscribers={subscribers} />
      </div>
    )
  }
  sorting = () => {
    let surname = false;
    let appearance = false;
    let intellect = false;
    if (document.getElementById('sorting').value === "По красоте") {
      appearance = true;
      intellect = false;
      surname = false;
    } else if (document.getElementById('sorting').value === "По интеллекту") {
      intellect = true;
      appearance = false;
    } else if (document.getElementById('sorting').value === "По фамилии") {
      appearance = false;
      intellect = false;
      surname = true;
    }
    if (appearance) {
      for (let i = 0; i < this.state.subscribers.length - 1; i++) {
        for (let j = i + 1; j < this.state.subscribers.length; j++) {
          if (this.state.subscribers[i].appearance < this.state.subscribers[j].appearance) {
            let temp = this.state.subscribers[i];
            // eslint-disable-next-line
            this.state.subscribers[i] = this.state.subscribers[j];
            // eslint-disable-next-line
            this.state.subscribers[j] = temp;
          }
        }
      }
      this.setState({
        subscribers: this.state.subscribers
      })
    } else if (intellect) {
      for (let i = 0; i < this.state.subscribers.length - 1; i++) {
        for (let j = i + 1; j < this.state.subscribers.length; j++) {
          if (this.state.subscribers[i].intellect < this.state.subscribers[j].intellect) {
            let temp = this.state.subscribers[i];
            // eslint-disable-next-line
            this.state.subscribers[i] = this.state.subscribers[j];
            // eslint-disable-next-line
            this.state.subscribers[j] = temp;
          }
        }
      }
      this.setState({
        subscribers: this.state.subscribers
      })
    }
    else if (surname) {
     for (let i = 0; i < this.state.subscribers.length - 1; i++) {
       for (let j = i + 1; j < this.state.subscribers.length; j++) {
         if (this.state.subscribers[i].surname > this.state.subscribers[j].surname) {
           let temp = this.state.subscribers[i];
           // eslint-disable-next-line
           this.state.subscribers[i] = this.state.subscribers[j];
           // eslint-disable-next-line
           this.state.subscribers[j] = temp;
         }
       }
     }
     this.setState({
       subscribers: this.state.subscribers
     })
   }
  }
  creatingAcc = () => {
    let isMale = document.getElementById('gender_male').checked;
    let isFemale = document.getElementById('gender_female').checked;
    let gender;
    if(isMale){
      gender = "мужской"
    } else if (isFemale) {
      gender = "женский"
    }
    let img = document.getElementById('img').value;
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let description = document.getElementById('description').value;
    if (isEmpty(img) || isEmpty(name) || isEmpty(surname) || isEmpty(description) || (!isMale && !isFemale)) {
      this.setState({
        isError: true
      })
    } else {
    this.state.subscribers.unshift(
      {
        "img": img,
        "name": name,
        "surname": surname,
        "description": description,
        "gender": gender,
        "appearance": 0,
        "intellect": 0,
        "votes": 0,
      },
      );
    this.setState({
      subscribers: this.state.subscribers,
      isError: false
    })
    document.getElementById("img").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("description").value = "";
  }
  }
}

export default Adding
