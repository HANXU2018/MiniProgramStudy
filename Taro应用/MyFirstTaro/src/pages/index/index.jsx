import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import Child from './child.js'

export default class Index extends Component {

  componentWillMount () {   }

  componentDidMount () {   }

  componentWillUnmount () {   }

  componentDidShow () {   }

  componentDidHide () {   }
  componentWillUpdate(){   }
  componentDidUpdate(){   }
  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    console.log('render');
    let {name} = this.state;
    return (
      <View className='index'>
        <Child name={name}></Child>
      <Text>{this.state.age}</Text>
      </View>
    )
  }
}
