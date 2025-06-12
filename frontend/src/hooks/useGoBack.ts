import { useRouter } from 'next/navigation';

export const useGoBack = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return { goBack };
}; 