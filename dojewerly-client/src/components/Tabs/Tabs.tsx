import React, { useState } from 'react';
import styles from './Tabs.module.css';
import Tab from './Tab/Tab';

export interface TabsProps {
  children: React.ReactElement[];
  activeTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, activeTab }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(children.findIndex(child => child.props.title === activeTab));

  return (
    <div>
      <div className={styles.tabs}>
        {children.map((child, index) =>
          <Tab
            key={index}
            title={child.props.title}
            active={index === activeTabIndex}
            onClick={() => setActiveTabIndex(index)}
          />
        )}
      </div>
      <div className={styles.line} />
      <div className={styles.content}>
        {children[activeTabIndex].props.children}
      </div>
    </div>
  );
};

export default Tabs;