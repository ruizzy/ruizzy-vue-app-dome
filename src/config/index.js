// 若后台接口未写好可引入 mocks 模拟数据，
// 或者客户需要生成静态版时，也可引入 mocks，这样就无需开启后台服务器
// import "../../mocks"
// 非生产环境 [Mock, test]
import Mock from '../mock'
import { openMock } from './conf'
import "./axios.conf"
import "./filter"
