import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import MainTable from './components/MainTable';
import AnalyticsChart from './components/AnalyticsChart';
import JobTitlesTable from './components/JobTitlesTable';
import "antd/dist/reset.css";
import './App.css';
import Chat from './components/Chat';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showJobTitles, setShowJobTitles] = useState<boolean>(false);

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setShowJobTitles(true);
  };

  const toggleJobTitlesTable = () => {
    setShowJobTitles(!showJobTitles);
  };

  return (
    <Layout className="layout">
      <Header>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <h1 id="heading">ML Engineer Salaries Dashboard</h1>
          <MainTable onSelectYear={handleSelectYear} />
          {selectedYear !== null && (
            <>
              <Button className = "button-prm" type="primary" onClick={toggleJobTitlesTable}>
                {showJobTitles ? 'Hide' : 'Show'} Job Titles in {selectedYear}
              </Button>
              {showJobTitles && (
                <>
                  <h1 id = "heading">Job Titles in {selectedYear}</h1>
                  <JobTitlesTable year={selectedYear} />
                </>
              )}
            </>
          )}
          <h1 id = "heading">Analytics</h1>
          <div className="chart">
          <AnalyticsChart />

          </div>
          <Chat />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
