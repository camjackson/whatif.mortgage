import React, { FC, useState } from 'react';
import Hamburger from '../icons/Hamburger';

const dropDownCoords = {
  top: 0,
  right: 0,
};

const Li = (props: any) => (
  <li className="px-3 py-2 border-t-0 border-gray-300" {...props} />
);

type Props = {
  reset: () => void;
};

const HeaderMenu: FC<Props> = ({ reset }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const resetAndClose = () => {
    reset();
    toggleMenu();
  };

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
          {false && <Li>Import...</Li>}
          {false && <Li>Export...</Li>}
          {false && <Li>Set currency...</Li>}
          <Li>
            <button
              className="bg-white hover:bg-red-100 border rounded-sm border-red-600 text-red-600 px-3 py-2"
              onClick={resetAndClose}
            >
              Reset (clear everything!)...
            </button>
          </Li>
        </ul>
      )}
    </>
  );
};

export default HeaderMenu;
