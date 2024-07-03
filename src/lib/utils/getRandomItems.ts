// 랜덤으로 아이템을 선택하는 함수
export const getRandomItems = (items: NoticeItem[], count: number) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
