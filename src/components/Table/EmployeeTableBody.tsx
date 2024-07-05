import StatusBadge from '@/components/Badge/StatusBadge';
import FormatUtils from '@/lib/utils/FormatUtils';

interface EmployeeTableBodyProps {
  items: ApplicationListResponseData['items'];
}

const BASE_TD_STYLE =
  'border-gray20 border-b-1px bg-white h-46px tablet:h-69px pc:h-69px text-14px tablet:text-16px pc:text-16px';

function EmployeeTableBody({ items }: EmployeeTableBodyProps) {
  return (
    <tbody>
      {items.map(({ item }) => {
        const { id, shop, notice, status } = item;
        const { name } = shop.item;
        const { hourlyPay, workhour, startsAt } = notice.item;
        const formattedSchedule = FormatUtils.workSchedule(
          startsAt,
          workhour
        ).formattedSchedule;
        const formattedPay = FormatUtils.price(hourlyPay);

        return (
          <tr key={id}>
            <td
              className={`${BASE_TD_STYLE} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px pl-8px`}
            >
              {name}
            </td>
            <td
              className={`${BASE_TD_STYLE} min-w-102px tablet:min-w-[300px] pl-8px`}
            >
              {formattedSchedule}
            </td>
            <td className={`${BASE_TD_STYLE} min-w-162px pl-8px`}>
              {formattedPay}원
            </td>
            <td
              className={`${BASE_TD_STYLE} min-w-102px tablet:min-w-[200px] pc:w-236px pl-12px`}
            >
              <StatusBadge status={status} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default EmployeeTableBody;
