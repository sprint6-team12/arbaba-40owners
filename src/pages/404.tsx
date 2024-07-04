import Link from 'next/link';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-80px">
          <div className="absolute inset-0 bg-red30 rotate-45 border-4 border-black rounded-md"></div>
          <div className="absolute inset-0 border-4 border-black rounded-md shadow-inner animate-spin-slow"></div>
          <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-black transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            404
          </h1>
        </div>
        <h2 className="mt-20px mb-20px text-2xl font-bold text-black uppercase tracking-widest">
          Page not found
        </h2>
        <p className="text-base text-black mb-10px">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-red40 text-white font-bold uppercase rounded-full hover:bg-gray-800 transition-colors"
        >
          홈페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Error404;
