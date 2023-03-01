import {FC} from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Space, Typography} from 'antd';
import './AdminPanelPage.css';
import { useState, useEffect} from 'react';
import { fetchPatients} from "./AdminPanelSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState} from '../../store';
import Spinner from "../../components/Spinner/Spinner";
import AdminPanelListItem from "../../components/AdminPanelListItem/AdminPanelListItem";
import { useSelector } from 'react-redux';
import { IPatients } from '../../models/IPatients';

const { Title } = Typography;



const { Content, Sider } = Layout;

const items1: MenuProps['items'] = ['Активные', 'Подтвержденные', 'Отмененные'].map((key) => ({
  key,
  label: ` ${key} записи`,
}));

export type StatusType = 'active' | 'confirmed' | 'canceled'

const AdminPanelPage: FC = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();


const [status, setStatus] = useState<StatusType>('active')

const onChangeStatus = (key: 'Активные' | 'Подтвержденные' | 'Отмененные') => {
  switch(key) {
    case 'Активные':
      setStatus(status => 'active')
      break;
    case 'Подтвержденные':
        setStatus(status => 'confirmed')
        break;
      case 'Отмененные':
          setStatus(status => 'canceled')
        break;
      default:
        throw new Error('ошибка данных')
  }
}

const loadingStatus = useSelector((state: RootState) => state.patients.patientsLoadingStatus)
const patients = useSelector((state: RootState) => state.patients.patients);

const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
  dispatch(fetchPatients())
}, [])

  
if (loadingStatus === "loading") {
  return <Spinner/>;
} else if (loadingStatus === "error") {
  return <Title level={2}>Ошибка загрузки</Title>
}

const renderPatientsList = (arr:IPatients[]) => {
  if (arr.length === 0) {
      return (
          <>
              <Title level={2}>Список заявок пуст</Title>
          </>
      )
  }

  return arr.map(({...props}) => {
      return (
          <>
              <AdminPanelListItem key={props.id} {...props}/>
          </>
      )
  })
}

const elements = renderPatientsList(Object.values(patients).filter(el => el.status === status).sort((a, b) => a.dateCreated - b.dateCreated))

  return (
    <Layout className='AdminPage_layout'>
      <Layout>
        <Sider width={250} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['Активные']}
            defaultOpenKeys={['Активные']}
            style={{ height: '100%', borderRight: 0 }}
            items={items1}
            onClick={(key) => {
              onChangeStatus(key.key as 'Активные' | 'Подтвержденные' | 'Отмененные')
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
              {elements}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanelPage;