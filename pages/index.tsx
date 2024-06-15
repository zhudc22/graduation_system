import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import StatisticsPage from '@/components/Statistics';
import RateChart from '@/components/RateChart';
import MultiIntervalStats from '@/components/MultiStats';
import NumberAppearanceRate from '@/components/MumberAppearanceRate';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '号码出现次数统计',
    children: <StatisticsPage />,
  },
  {
    key: '2',
    label: '号码出现率折线图',
    children: <RateChart />,
  },
  {
    key: '3',
    label: '不同倍数间隔的号码出现情况统计',
    children: <MultiIntervalStats />,
  },
  {
    key: '4',
    label: '连续累加间隔的号码出现率折线图',
    children: <NumberAppearanceRate />,
  },
];

const App: React.FC = () => (
  <div>
    <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
  </div>
);

export default App;
