import UnregisteredMyPage from '@/components/pageComponents/MyPage/UnregisteredMyPage';

export default function Home() {
  return (
    <main>
      <UnregisteredMyPage userProfileData={undefined} />
    </main>
  );
}
