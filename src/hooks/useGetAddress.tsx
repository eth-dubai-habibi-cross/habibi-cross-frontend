import { useQuery } from '@tanstack/react-query';

import useGlobalStore from '@/store/store';

const useGetAddress = () => {
  const { smartAccount } = useGlobalStore();
  return useQuery({
    queryKey: ['smartAccount=', !!smartAccount],
    queryFn: async () => {
      if (!smartAccount) {
        return null;
      }

      const ss = await smartAccount.getAccountAddress();
      return ss;
    },
  });
};

export default useGetAddress;
