import React, { FC, useState } from 'react';
import Hamburger from '../icons/Hamburger';

const dropDownCoords = {
  top: 0,
  right: 0,
};

const Li = (props: any) => (
  <li className="px-3 py-2 border-t border-gray-300" {...props} />
);

type Props = {
  importFromString: (importString: string) => void;
  exportString: string;
  currencySymbol: string;
  setCurrencySymbol: (currencySymbol: string) => void;
  reset: () => void;
};

const HeaderMenu: FC<Props> = ({
  importFromString,
  exportString,
  currencySymbol,
  setCurrencySymbol,
  reset,
}) => {
  const [showMenu, setShowMenu] = useState(true); //TODO: false
  const toggleMenu = () => setShowMenu(!showMenu);

  const [importString, setImportString] = useState('');
  const importButtonClick = () => {
    try {
      importFromString(importString);
      toggleMenu();
    } catch (e) {
      alert(
        `Import failed.

You can export your data by copying the export text above.`,
      );
    }
  };

  const onChangeCurrency = (e: any) => {
    setCurrencySymbol(e.target.value);
  };

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
          <Li>
            <button
              className="border border-green-700 px-2 py-1 hover:bg-green-200 text-green-700"
              onClick={importButtonClick}
            >
              Import
            </button>
            <input
              type="text"
              id="inputText"
              className="border-b border-black ml-3 text-gray-900 text-ellipsis"
              value={importString}
              onChange={e => setImportString(e.target.value)}
            />
          </Li>
          <Li>
            <label>
              Export text:
              <input
                type="text"
                readOnly
                className="border-b border-black ml-3 text-gray-900 text-ellipsis"
                value={exportString}
              />
            </label>
          </Li>
          <Li>
            <label>
              Set currency:
              <input
                type="text"
                className="border-b border-black ml-3 w-6 text-center text-gray-900"
                value={currencySymbol}
                onChange={onChangeCurrency}
              />
            </label>
          </Li>
          <Li>
            <button
              className="bg-white hover:bg-red-200 border rounded-sm border-red-600 text-red-600 px-3 py-2"
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
