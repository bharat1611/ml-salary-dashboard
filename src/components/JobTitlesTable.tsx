import React from 'react';
import { Table } from 'antd';
import salaryData from '../data/salaryData';

interface JobTitlesTableProps {
  year: number | null;
}

const JobTitlesTable: React.FC<JobTitlesTableProps> = ({ year }) => {
  if (year === null) {
    return null;
  }

  const selectedYearData = salaryData.find(data => data.year === year);
  if (!selectedYearData) {
    return null;
  }

  const data = Object.entries(selectedYearData.jobs).map(([job, count]) => ({
    job,
    count,
  }));

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job',
      key: 'job',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="job"
      pagination={false}
    />
  );
};

export default JobTitlesTable;
