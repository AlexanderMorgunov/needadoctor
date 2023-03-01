import React, {FC, useState} from "react";
import { Button, Form, Input, InputNumber, Select, Tag, DatePicker, Modal} from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import './FormPatient.css'
import {nanoid} from 'nanoid';
import { IPatient } from "../../models/IPatient";
import { useFirebase }  from '../../hooks/firebase.hook';
import moment, { Moment} from "moment";
import { Rule } from "antd/es/form";
import {CheckCircleTwoTone} from '@ant-design/icons';
import { NavLink } from "react-router-dom";


const generateId = () => {
  const id = nanoid(8);
  return id;
}

const options = [{ value: 'насморк' }, 
                 { value: 'боль в горле' },
                 { value: 'температура' },
                 { value: 'ломота в теле' },
                 { value: 'потеря обаняния'},
                 { value: 'сухой кашель'},
                 { value: 'влажный кашель'},
                ];


const isDateAfter = (message: string): Rule => ({
  validator(_:any, value: Moment) {
    if(value.isSameOrAfter(moment())) {
      return Promise.resolve();
    }
      return Promise.reject(new Error(message));
  }
 })                

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
  
const validateMessages = {
  required: 'Поле ${label} обязательно для заполнения!',
  types: {
    email: 'некорректный email!',
    number: '${label} неправильный номер!',
  },
  number: {
    range: '${label} нужно указать в диапозоне от ${min} до ${max}',
  },
};  

const FormPatient: FC = () => {

const [isSend, setIssend] = useState<boolean>(false)

const [form] = Form.useForm();

    const {writePatientData} = useFirebase();

    const onFinish = (values: IPatient) => {
      writePatientData({...values, id: generateId()});
      form.resetFields();
      setIssend(isSend => true);
    };

    const { Option } = Select;
    
    const prefixSelector = (
      <Form.Item name="prefix" noStyle
      rules={[{ required: true, message: 'Пожалуйста, введите контактый номер телефона!' }]}>
        <Select style={{ width: 70 }}>
          <Option value="7">+7</Option>
          <Option value="1">+1</Option>
          <Option value="2">+2</Option>
          <Option value="3">+3</Option>
          <Option value="4">+4</Option>
          <Option value="5">+5</Option>
          <Option value="6">+6</Option>
          <Option value="8">+8</Option>
        </Select>
      </Form.Item>
    );

    const handleOk = () => {
      setIssend(false);
    };
  
    const handleCancel = () => {
      setIssend(false);
    };
  
    return (
      <>
        <Modal title="Спасибо за обращение!" open={isSend} onOk={handleOk} onCancel={handleCancel} style={{textAlign:'center'}}>
        <CheckCircleTwoTone style={{fontSize:'50px'}}/>
        <p>Наши специалисты свяжутся с Вами в ближайшее время</p>
        <NavLink to="/">
            На главную
          </NavLink>
      </Modal>

        <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ width: 450, }}
      validateMessages={validateMessages}
      form={form}

      initialValues={{
         date: '',
        phone: '',
        prefix:'',
        age: 0,
        complaints: [],
        email: '',
        name: '',
        other: '',
        severity: 0
      }}
    >

      <Form.Item name={['user', 'name']} label="ФИО" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Возраст" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber max={99} min={0}/>
      </Form.Item>
      <Form.Item name={['user', 'complaints']} label="Жалобы" rules={[{ required: true }]}>
      <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}/>
      </Form.Item>
      <Form.Item name={['user', 'other']} label="Другое">
        <Input.TextArea/>
      </Form.Item >
      <Form.Item name={['user', 'severity']} label="Тяжесть симптомов" rules={[{ type: 'number', min: 0, max: 10, required: true }]}>
        <InputNumber max={10} min={0}/>
      </Form.Item>
       <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Пожалуйста, введите контактый номер телефона!' }]}
        >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item label="DatePicker"
      name="date"
       rules={[{ required: true, message: 'Пожалуйста, введите дату!' },({getFieldValue}) => ({
        validator(_: any, value: Moment) {
          if(value.isAfter(moment())) {
            return Promise.resolve();
          } else {
            return Promise.reject(new Error('некорректная дата'));
          }
        }
       })]}>
        <DatePicker/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
      </>
  )};
  

export default FormPatient;