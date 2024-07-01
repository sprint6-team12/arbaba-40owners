interface DropdownButtonProps {
  toggleOpen: boolean;
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  children: React.ReactNode;
}

function DropdownButton({
  toggleOpen,
  setToggleOpen,
  selectedOption,
  children,
}: DropdownButtonProps) {
  return (
    <div
      className="relative w-105px h-30px bg-gray10 rounded-5px flex-center gap-6px cursor-pointer select-none"
      onClick={() => {
        setToggleOpen(!toggleOpen);
      }}
    >
      <span className="font-bold text-14px">{selectedOption}</span>
      {children}
    </div>
  );
}

export default DropdownButton;
