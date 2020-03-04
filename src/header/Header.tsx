import React, { FC } from 'react';
import { BaseScenario, ScenarioKey } from '../models';
import HeaderForm from './HeaderForm';
import HeaderMenu from './HeaderMenu';

type Props = {
  baseScenario: BaseScenario;
  setValue: (key: ScenarioKey) => (event) => void;
  reset: () => void;
};

const Header: FC<Props> = ({ baseScenario, setValue, reset }) => (
  <header className="shadow-md fixed w-full h-20 top-0 bg-gray-100 flex items-center">
    <HeaderForm baseScenario={baseScenario} setValue={setValue} />
    <HeaderMenu reset={reset} />
  </header>
);

export default Header;
