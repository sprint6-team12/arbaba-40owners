import EmployerTableItem from './EmployerTableItem';

interface EmployerTableBodyProps {
  items: ApplicationListResponseData['items'];
}

function EmployerTableBody({ items }: EmployerTableBodyProps) {
  return (
    <tbody>
      {items.map(({ item, links }) => {
        return <EmployerTableItem key={item.id} item={item} links={links} />;
      })}
    </tbody>
  );
}

export default EmployerTableBody;
