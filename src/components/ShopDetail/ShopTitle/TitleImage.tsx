export default function ShopImageSection({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="overflow-hidden rounded-12px min-h-[358px] min-w-[539px]">
      {/* <Image src={imageUrl} alt={name} width={539} height={358} /> */}
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </div>
  );
}
