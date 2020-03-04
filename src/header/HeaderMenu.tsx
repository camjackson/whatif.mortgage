import React, { useState } from 'react';
import Hamburger from '../icons/Hamburger';

const dropDownCoords = {
  top: 0,
  right: 0,
};

const Li = (props: any) => (
  <li
    className="px-3 py-2 border-t-0 border-gray-300 hover:bg-gray-200"
    {...props}
  />
);

const HeaderMenu = () => {
  const [showMenu, setShowMenu] = useState(true);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <button
        title="Options"
        className="mr-3 mt-2 border-gray-200 z-10 self-start"
        onClick={toggleMenu}
      >
        <Hamburger className="text-gray-800" />
      </button>
      {showMenu && (
        <ul
          style={dropDownCoords}
          className="fixed pt-12 shadow-2xl bg-white text-left"
        >
          <Li>Import...</Li>
          <Li>Export...</Li>
          <Li>Set currency...</Li>
          <Li>Clear all...</Li>
        </ul>
      )}
    </>
  );
};

export default HeaderMenu;
