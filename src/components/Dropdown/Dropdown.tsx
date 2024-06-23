import React, { useState, useRef, useEffect } from 'react';
import DropDown from '/public/images/icon-dropdown.svg';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  width?: string;
  defaultValue?: string;
  title?: string;
}

function Dropdown({
  options,
  title = '타이틀',
  defaultValue = '선택',
}: DropdownProps) {
  const dropDownClickRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClick = (e: MouseEvent) => {
    if (
      dropDownClickRef.current &&
      !dropDownClickRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <div className="flex flex-col gap-2 text-black">
      {title && <p className="text-base leading-6">{title}</p>}
      <div
        className="relative inline-block w-300px "
        ref={dropDownClickRef}
        onClick={handleToggleDropdown}
      >
        <div className="absolute top-1/2 right-16px transform -translate-y-1/2 w-16px h-16px flex-shrink-0">
          <DropDown />
        </div>
        <button className="flex w-full px-20px py-16px items-center border bg-white border-gray-30 rounded-md text-base">
          {selectedOption}
        </button>
        {isOpen && (
          <div className="absolute inline-flex flex-col rounded-md border-2px items-center border-gray-20 bg-white shadow-md z-5 mt-8px overflow-y-auto overflow-x-hidden max-h-200px z-dropdown right-7px left-7px">
            {options.map((option) => (
              <div
                className="w-full flex px-24px py-12px items-center gap-16px cursor-pointer text-base leading-26 tracking--0.16 hover:bg-gray-100 border border-gary-20"
                key={option}
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
