import React from 'react';
import Tab from '../Tabs/Tab/Tab';
import CollectionCreationPage from '../../pages/CollectionCreationPage/CollectionCreationPage';

const AdminTabs: React.FC = () => {
  return (
    <>
      <Tab title="Products">
        <CollectionCreationPage />
      </Tab>
      {/* Другие вкладки администратора */}
    </>
  );
};

export default AdminTabs;