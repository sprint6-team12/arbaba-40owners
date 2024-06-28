import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Logout() {
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUser(null, null, 'guest', false);
    router.push('/');
  });
}
