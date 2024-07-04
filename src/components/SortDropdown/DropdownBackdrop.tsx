interface DropdownBackdropProps {
  toggleOpen: boolean;
}

function DropdownBackdrop({ toggleOpen }: DropdownBackdropProps) {
  return (
    <>
      {toggleOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 cursor-auto" />
      )}
    </>
  );
}

export default DropdownBackdrop;
