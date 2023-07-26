import React, { memo } from 'react';
import Counter from '../../app/reducers/example/Counter';

const Header = memo(() => {
  return (
    <div>
      Header
      <Counter />
    </div>
  );
});

export default Header;