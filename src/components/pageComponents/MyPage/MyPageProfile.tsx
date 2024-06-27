import Button from '@/components/Button/Button';

export default function MyPageProfile({ data }: MyPageProfile) {
  const ProfileData = data.data.item;
  return (
    <div>
      <div>
        <div>
          <p>이름</p>
          <h2>{ProfileData.name}</h2>
        </div>
        <div>{ProfileData.phone}</div>
        <div>{ProfileData.address}</div>
        <div>{ProfileData.bio}</div>
      </div>
      <div>
        <Button className="button_medium_disActive">편집하기</Button>
      </div>
    </div>
  );
}
