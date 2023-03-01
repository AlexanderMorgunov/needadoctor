import {FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, IAuth, TypeloginLoadingStatus, loginIsAuth } from './LoginSlice'
import { AppDispatch, RootState} from '../../store';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate} from 'react-router-dom';
import './Login.css'


const Login: FC = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(fetchLogin());
    },[])

    const navigate = useNavigate()

    
    async function getAuth(auth: boolean) {
      dispatch(loginIsAuth(auth))
    }

      const onFinish = (values: IAuth) => {
      const isAuth = values.username == authData.username && values.password == authData.password;

      getAuth(isAuth).then(() => {
             if(isAuth) {
            navigate('/AdminPanelPage');
          } else {
            console.log(isAuth)
          }
        })
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    const authData: IAuth = useSelector((state: RootState) => state.login.login);
    
    const status: TypeloginLoadingStatus = useSelector((state: RootState) => state.login.loginLoadingStatus)

    return(
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='login_form'
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className='submit_btn'>
        Submit <span className='loading-spinner'>{status === 'loading' ? <Spinner width='20px' height='20px'/> : null} </span>
        </Button>
      </Form.Item>
    </Form>
  )};
  
  export default Login;



