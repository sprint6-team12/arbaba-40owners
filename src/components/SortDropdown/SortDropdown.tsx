import { useState } from 'react';
import { IconSortDropdownArrow } from '@/lib/utils/Icons';
import DropdownBackdrop from './DropdownBackdrop';
import DropdownButton from './DropdownButton';
import DropdownOptions from './DropdownOptions';

function SortDropdown() {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('마감임박순');

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    const { value } = (event.target as HTMLElement).dataset;
    value && setSelectedOption(value);
  };

  const handleToggleClick = () => {
    setToggleOpen(!toggleOpen);
  };

  return (
    <DropdownButton
      selectedOption={selectedOption}
      toggleOpen={toggleOpen}
      setToggleOpen={setToggleOpen}
    >
      <IconSortDropdownArrow
        className={`text-black w-10px h-10px transform transition-transform duration-200 ${toggleOpen ? 'rotate-180' : ''}`}
      />
      <DropdownOptions toggleOpen={toggleOpen} onClick={handleOptionClick} />
      <DropdownBackdrop toggleOpen={toggleOpen} onClick={handleToggleClick} />
    </DropdownButton>
  );
}

export default SortDropdown;
