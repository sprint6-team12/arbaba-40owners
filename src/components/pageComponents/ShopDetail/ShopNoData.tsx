import LinkButton from '@/components/Button/LinkButton';

export default function ShopNoData({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex-col w-full border border-solid flex-center py-60px border-gray20 rounded-12px gap-24px">
      <p>{title}</p>
      <LinkButton className="button_large_active" href="/">
        {text}
      </LinkButton>
    </div>
  );
}
