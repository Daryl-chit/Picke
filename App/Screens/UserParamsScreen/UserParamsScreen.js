import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { range } from 'ramda'
import { MIN_ACCEPTED_AGE, MAX_ACCEPTED_AGE } from 'Config/Constants'
import { Header, Pager } from 'Components'

import SexualPreference from './Components/SexualPreference'
import AddEmail from './Components/AddEmail'
import AddPassword from './Components/AddPassword'
import AddName from './Components/AddName'
import AddBirthday from './Components/AddBirthday'
import YourDetails from './Components/YourDetails'
import MainPhoto from './Components/MainPhoto'
import YouAreDone from './Components/YouAreDone'
import moment from 'moment'

import { getStepIndicatorParams } from './Utils'
import styles from './UserParamsScreen.style'

import { GENERAL_DATE_FORMAT, USER_DATE_FORMAT } from 'Config/Constants'

export default class UserParamsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      email: props.user.email || null,
      photo: props.user.photos.length > 0 ? props.user.photos[0] : null,
      name: props.user.name || null,
      age: props.user.age ? props.user.age : null,
      lookingFor: null,
      details: null,
      user: props.user,
      titles: {
        'name': 'Add name',
        'email': 'Add email',
        'birthday': 'Add birthday',
        'sex': 'Sexual Preference',
        'details': 'Your details',
        'photo': 'Main photo',
        'done': 'You are done',
      }
    }

  }

  componentDidMount() {
    let new_titles = this.state.titles;

    if (this.state.name) {
      delete new_titles.name
    }
    if (this.state.email) {
      delete new_titles.email
    }
    if (this.isValidBirthday()) {
      delete new_titles.birthday
    }
    if (this.isCompletedDetails(this.state.user)) {
      delete new_titles.details
    }
    if (this.state.photo) {
      delete new_titles.photo
    }

    this.setState({
      titles: new_titles
    })
    this.stepsCount = Object.keys(new_titles).length
  }

  isCompletedDetails = (user) => {
    const { height, occupations, religion, bodyTypes, ethnicities } = user
    if (height === null || height === '0.00') {
      return false
    }
    if (occupations === null || occupations.length == 0 ) {
      return false
    }
    if (religion === null) {
      return false
    }
    if (bodyTypes === null || bodyTypes.length == 0) {
      return false
    }
    if (ethnicities === null || ethnicities.length == 0) {
      return false
    }
    return true
  }

  onSubmit = (value, field) => {
    if (field && value) this.setState({ [field]: value })
    this.goNext()
  }

  goNext = () => {
    const { step } = this.state
    if (step < this.stepsCount) {
      this.setState({ step: step + 1 })
      this.refs.slider.next()
    }
  }

  goBack = () => {
    const { step } = this.state
    if (step > 0) {
      this.refs.slider.prev()
      this.setState({ step: step - 1 })
    } else {
      Actions.replace('launchScreen')
    }
  }

  isValidBirthday = () => {
    const { age } = this.state
    if (age) {
      if (parseInt(age) >= MIN_ACCEPTED_AGE && parseInt(age) <= MAX_ACCEPTED_AGE) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  renderItems = () => {
    let items = [];
    if (this.state.titles.name) items.push(<AddName {...this.props} field='name' onSubmit={this.onSubmit} />)
    if (this.state.titles.email) items.push(<AddEmail {...this.props} field='email' onSubmit={this.onSubmit} />)
    if (this.state.titles.birthday) items.push(<AddBirthday {...this.props} field='birthdate' onSubmit={this.onSubmit} />);
    if (this.state.titles.sex) items.push(<SexualPreference {...this.props} field='lookingFor' onSubmit={this.onSubmit} />);
    if (this.state.titles.details) items.push(<YourDetails {...this.props} field='details' onSubmit={this.onSubmit} />);
    if (this.state.titles.photo) items.push(<MainPhoto {...this.props} field='photo' onSubmit={this.onSubmit} />);
    if (this.state.titles.done) items.push(<YouAreDone photo={this.state.photo} {...this.props} onSubmit={this.onSubmit} />);
    return items
  }

  render () {
    const { step } = this.state
    const titles = Object.keys(this.state.titles).map((key) => this.state.titles[key]);
    const steps = getStepIndicatorParams({ current: step, total: titles.length })
    const stepInfo = `${step + 1}/${this.stepsCount}`
    const title = (titles[step] || '').toUpperCase()
    return (
      <View style={styles.screen}>
        <Header
          progress={steps}
          current={step}
          onBack={this.goBack}
          title={title}
          stepInfo={stepInfo}
        />
        <Pager data={this.renderItems()} ref='slider' />
      </View>
    )
  }
}
