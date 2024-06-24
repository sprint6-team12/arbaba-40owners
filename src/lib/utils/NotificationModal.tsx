import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import IconEllipseBlue from '@/../public/images/icon-ellipse-blue.svg';
import IconEllipseGray from '@/../public/images/icon-ellipse-gray.svg';
import IconEllipseOrange from '@/../public/images/icon-ellipse-orange.svg';

export const formatDate = (dateString: string) => {
  return formatDistanceToNow(parseISO(dateString), {
    addSuffix: true,
    locale: ko,
  });
};

export const getResultInfo = (result: string) => {
  switch (result) {
    case 'canceled':
      return {
        icon: <IconEllipseGray />,
        text: <span className="text-gray20">취소</span>,
      };
    case 'rejected':
      return {
        icon: <IconEllipseOrange />,
        text: <span className="text-red20">거절</span>,
      };
    case 'accepted':
      return {
        icon: <IconEllipseBlue />,
        text: <span className="text-blue10">승인</span>,
      };
    default:
      return null;
  }
};

export const getWorkTime = (startsAt: string, workhour: number) => {
  const startTime = parseISO(startsAt);
  const endTime = new Date(startTime.getTime() + workhour * 60 * 60 * 1000);
  const formattedStartTime = format(startTime, 'yyyy-MM-dd HH:mm', {
    locale: ko,
  });
  const formattedEndTime = format(endTime, 'HH:mm', { locale: ko });

  return { formattedStartTime, formattedEndTime };
};