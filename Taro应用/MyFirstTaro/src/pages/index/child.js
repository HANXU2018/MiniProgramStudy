import Taro,{Component} from '@tarojs/taro';
import{View,Text} from '@tarojs/components';
class Child extends Component{
    render(){
        let {name} = this.props;
        return(<View>我是子节点{name}</View>)
    }
}
export default Child;