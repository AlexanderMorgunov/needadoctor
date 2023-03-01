import {FC} from 'react';
import { Row, Button, Space} from 'antd';
import { Link } from 'react-router-dom';
import './ChooseRole.css'

const ChooseRole: FC = () => {
    return(
        <Row justify='center' className='chooseRole-container'>
             <Space wrap>
                <Button size='large' type="primary"><Link to="FormPatient">Продожить как пациент</Link></Button>
                <Button size='large'><Link to='Login'>Продожить как администратор</Link></Button>
            </Space>
        </Row>
        
    )
}

export default ChooseRole;