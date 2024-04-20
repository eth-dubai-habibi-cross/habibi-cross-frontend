import { BiconomySmartAccountV2 } from '@biconomy/account';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalStore {
  smartAccount: BiconomySmartAccountV2 | null;
  setSmartAccount: (account: BiconomySmartAccountV2 | null) => void;
}

const useGlobalStore = create<GlobalStore>()(
  devtools((set) => ({
    smartAccount: null,
    setSmartAccount: (account) => set(() => ({ smartAccount: account })),
  }))
);

export default useGlobalStore;
