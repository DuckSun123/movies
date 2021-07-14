import './App.less';
import ListContainer from './Containers/List/ListContainer'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const style = {
  header: { position: 'fixed', zIndex: 1, width: '100%' },
  content: { margin: '64px 0', height: 'calc(100vh - (64px * 2))', padding: '12px', overflowX: 'hidden', overflowY: 'auto' },
  footer: { position: 'fixed', zIndex: 1, bottom: '0', width: '100%' }
}
function App() {
  return (
    <Layout>
      <Header style={style.header}>Header</Header>
      <Content style={style.content}>
        <ListContainer />
      </Content>
      <Footer style={style.footer}>Footer</Footer>
    </Layout>
  );
}

export default App;
