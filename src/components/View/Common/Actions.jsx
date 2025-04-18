import React, { useState } from 'react';
import { GiftFilled, StarFilled } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: 'Placa de Cumple',
    key: 'mail',
    icon:<StarFilled />,
    
  },
  {
    label: 'Placa de Bienvenida',
    key: 'app',
    icon: <GiftFilled />,
    disabled: true,
  },
];
const Actions = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Actions;