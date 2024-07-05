import StatusBadge from '@/components/Badge/StatusBadge';
import FormatUtils from '@/lib/utils/FormatUtils';
import ActionButton from './ActionButton';

interface EmployerTableBodyProps {
  items: ApplicationListResponseData['items'];
}

const BASE_TD_STYLE = `border-gray20 border-b-1px text-14px tablet:text-16px pc:text-16px bg-white`;

function EmployerTableBody({ items }: EmployerTableBodyProps) {
  return (
    <tbody>
      {items.map(({ item, links }) => {
        if (!('user' in item)) return null;

        const { id, status, user } = item;
        const { name, phone, bio } = user.item;
        const formPhone = FormatUtils.phoneNumber(phone || '연락처 없음');

        return (
          <tr key={id}>
            <td
              className={`${BASE_TD_STYLE} min-w-162px tablet:min-w-[228px] pc:w-228px h-46px sticky left-0 pl-8px z-10`}
            >
              {name}
            </td>
            <td
              className={`${BASE_TD_STYLE} min-w-262px tablet:min-w-[300px] pc:w-300px h-46px tablet:h-91px pc:h-91px pl-8px tablet:py-20px tablet:px-16px pc:py-20px pc:px-16px`}
            >
              <p className="line-clamp-2">{bio}</p>
            </td>
            <td className={`${BASE_TD_STYLE} min-w-142px h-46px pl-8px`}>
              {formPhone}
            </td>
            <td
              className={`${BASE_TD_STYLE} min-w-160px tablet:min-w-[220px] pc:w-236px h-46px`}
            >
              {status === 'pending' && links ? (
                <ActionButton href={links[0].href} />
              ) : (
                <StatusBadge status={status} />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default EmployerTableBody;
