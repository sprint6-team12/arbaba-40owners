interface DropdownBackdropProps {
  toggleOpen: boolean;
  onClick: () => void;
}

function DropdownBackdrop({
  toggleOpen,
  onClick: handleToggleClick,
}: DropdownBackdropProps) {
  return (
    <>
      {toggleOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-5 cursor-auto"
          onClick={handleToggleClick}
        />
      )}
    </>
  );
}

export default DropdownBackdrop;
