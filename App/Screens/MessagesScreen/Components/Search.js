import React, { Component } from 'react'
import { View, TextInput } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

import { Fonts, Images } from 'Themes'
import { FastImage as Image } from 'Components'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: ''
    }
  }
  handleChange (searchString) {
    const { onChange } = this.props
    this.setState({ searchString })
    if (onChange) onChange(searchString)
  }
  render () {
    const { searchString } = this.state
    return (
      <View style={s.container}>
        <View style={s.inputContainer}>
          <Image
            source={Images.searchGray}
            style={s.searchIcon} />
          <TextInput
            style={s.textArea}
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={text => {}}
            onChangeText={text => this.handleChange(text)}
            underlineColorAndroid='transparent'
            value={searchString}
            placeholderTextColor={'#8e8e8e'}
            placeholder={`Search`}
          />
        </View>
      </View>
    )
  }
}

const s = EStyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '0.6rem',
    marginBottom: '0.9rem'
  },
  searchIcon: {
    width: '1.15rem',
    height: '1.15rem'
  },
  textArea: {
    flex: 1,
    paddingVertical: '0.8rem',
    paddingLeft: '0.5rem',
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '1rem'
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '0.7rem',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: '1.2rem',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1,
    flexDirection: 'row'
  }
})
