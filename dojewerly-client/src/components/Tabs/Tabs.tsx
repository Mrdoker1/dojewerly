import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Tabs.module.css';
import Tab from './Tab/Tab';

export interface TabsProps {
  tabs: {
    title: string;
    route?: string;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | number>(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            active={tab.route ? tab.route === activeTab : index === activeTab}
            onClick={() => {
              if (tab.route) {
                setActiveTab(tab.route);
                navigate(tab.route);
              } else {
                setActiveTab(index);
              }
            }}
          />
        ))}
      </div>
      <div className={styles.line} />
    </div>
  );
};

export default Tabs;