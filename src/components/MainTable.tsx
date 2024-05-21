import React, { useState } from 'react';
import { Table } from 'antd';
import salaryData from '../data/salaryData';

// eslint-disable-next-line
const MainTable: React.FC<{ onSelectYear: (year: number) => void }> = ({ onSelectYear }) => {
  const [sortedInfo, setSortedInfo] = useState(null);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: any, b: any) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'total_jobs',
      key: 'total_jobs',
      sorter: (a: any, b: any) => a.total_jobs - b.total_jobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'average_salary',
      key: 'average_salary',
      sorter: (a: any, b: any) => a.average_salary - b.average_salary,
    },
  ];

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  return (
    <Table
      columns={columns}
      dataSource={salaryData}
      rowKey="year"
      onChange={handleChange}
      onRow={(record) => ({
        onClick: () => onSelectYear(record.year),
      })}
    />
  );
};

export default MainTable;
