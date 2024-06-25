import { getUserData } from '@/hooks/linksUser';
import userAPI from '@/utils/api/userAPI';

export default function Home() {
  // const res = userAPI.getUserData('44013c4443-72b6-4ce6-8e51-ea83a04b55be')
  // console.log(res)
  getUserData('440c4443-72b6-4ce6-8e51-ea83a04b55be');

  return <main></main>;
}
