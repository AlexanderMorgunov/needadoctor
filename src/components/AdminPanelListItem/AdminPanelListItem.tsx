import { IPatients } from "../../models/IPatients";
import React, {FC, useState} from 'react';
import { fetchPatients } from "../../pages/AdminPanel/AdminPanelSlice";
import { useDispatch } from "react-redux";
import { AppDispatch} from '../../store';
import { Collapse, Table, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StatusType } from "../../pages/AdminPanel/AdminPanelPage";
import './AdminPanelListItem.css';
import moment from "moment";
import { useFirebase } from "../../hooks/firebase.hook";


const {Panel} = Collapse;

interface DataType {
    key: React.Key;
    age:  string;
    phone: string;
    email: string;
    complaints: string;
    other: string;
    date: string;
    severity: number;

  }

const columns: ColumnsType<DataType> = [
    {
      title: 'возраст',
      dataIndex: 'age',
    },
    {
      title: 'телефон',
      dataIndex: 'phone',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'жалобы',
      dataIndex: 'complaints',
    },
    {
        title: 'другие жалобы',
        dataIndex: 'other',
    },
    {
        title: 'желаемая дата посещения',
        dataIndex: 'date',
    },
    {
        title: 'тяжесть симптомов',
        dataIndex: 'severity',
    },
  ];

const AdminPanelListItem: FC<IPatients> = ({name, age, date, phone, email, complaints, dateCreated, status, id, severity, other,}: IPatients) => {

const {writePatientStatus} = useFirebase();

const [stateStatus, setStateStatus] = useState<StatusType>(status);

const dispatch = useDispatch<AppDispatch>()

async function changeStatus(status: StatusType) {
  setStateStatus(status);
}
    const data: DataType[] = [
        {
          key: '1',
          age: (age?.toString() || 'нет данных'),
          phone: phone,
          email: (email || 'нет данных'),
          complaints: complaints,
          other: (other || 'нет данных'),
          date: moment(date).format("Do MMM YYYY").toString(),
          severity: severity
        }
      ];
      const onChange = (e: RadioChangeEvent) => {
        const status: StatusType = e.target.value;
        console.log('radio checked', status);
        changeStatus(status)
        .then(() => writePatientStatus(id, status))
        .then(() => dispatch(fetchPatients()))
      };

    return(
        <>
            <Collapse size='large' ghost={true} className='adminPanel_collapse'>
                <Panel header={`Пациент: ${name};  обращение составленно: ${moment(dateCreated).format("h:mm Do MMM YYYY")}`} key={id} 
                className={`adminPanel-panel-${stateStatus}`}
                >
                    <Radio.Group onChange={onChange} value={stateStatus}>
                      <Radio value={'active'}>Активная</Radio>
                      <Radio value={'confirmed'}>Подтверджена</Radio>
                      <Radio value={'canceled'}>Отменена</Radio>
                    </Radio.Group>
                    <Table columns={columns} dataSource={data} size="middle" />
                </Panel>
            </Collapse>
        </>
    )
}
export default AdminPanelListItem
