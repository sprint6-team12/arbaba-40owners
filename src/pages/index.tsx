import Dropdown from '@/components/Dropdown/Dropdown';
import { LOCATIONS, MENU_CATEGORIES } from '@/constants/data-locations';

export default function Home() {
  return (
    <main>
      <Dropdown options={MENU_CATEGORIES} />
      <Dropdown options={LOCATIONS} />
    </main>
  );
}
