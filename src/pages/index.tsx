// pages/index.tsx

import Post from '@/components/Post/Post';

const examplePost = {
  hourlyPay: 15000,
  startsAt: '2023-07-01T14:00:00Z',
  closed: false,
  workhour: 4,
  name: 'Sample Restaurant',
  address1: '123 Main St, City, Country',
  imageUrl: '/public/images/sample-restaurant.jpg',
  originalHourlyPay: 13000,
  href: '/posts/sample-restaurant',
};

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Post {...examplePost} />
    </div>
  );
}
