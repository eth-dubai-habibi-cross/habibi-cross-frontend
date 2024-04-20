import { createSmartAccountClient } from '@biconomy/account';
import { useMutation } from '@tanstack/react-query';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import { useToast } from '@/components/ui/use-toast';

import useGlobalStore from '@/store/store';

const BICONOMY_API_KEY = 'CVR6PwxcA.6e2333d3-7cbd-4b9d-acdb-0d490b86bbdf';

const useBiconomy = () => {
  const { toast } = useToast();
  const { data: walletClient } = useWalletClient();

  const { setSmartAccount } = useGlobalStore();
  // const url = `https://bundler.biconomy.io/api/v2/${sepolia.id}/${BICONOMY_API_KEY}`
  const url = `https://bundler.biconomy.io/api/v2/${sepolia.id}/${BICONOMY_API_KEY}`;

  // https://paymaster.biconomy.io/api/v1/97/CVR6PwxcA.6e2333d3-7cbd-4b9d-acdb-0d490b86bbdf


  const createSmartAccount = async () => {
    if (!walletClient) return;
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0xAA36A7',
      rpcTarget: sepolia.rpcUrls.default.http[0],
      displayName: sepolia.name,
      blockExplorer: sepolia.blockExplorers.default.url,
      ticker: sepolia.nativeCurrency.symbol,
      tickerName: sepolia.nativeCurrency.symbol,
    };
    try {
      const web3auth = new Web3Auth({
        clientId:
          'BFW3wcM203ReRzwb2nnd4bu4vUTtwPOZ7zsjkd62YkniA5DOtjJAXzchQGT_lvcJswnlp18k__tWqAPs76mGNAI', // Get your Client ID from the Web3Auth Dashboard https://dashboard.web3auth.io/
        web3AuthNetwork: 'sapphire_devnet', // Web3Auth Network
        chainConfig,
        uiConfig: {
          appName: 'Gamer portal X Web3Auth',
          mode: 'dark', // light, dark or auto
          loginMethodsOrder: ['apple', 'google', 'twitter'],
          logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
          logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
          defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
          loginGridCol: 3,
          primaryButton: 'socialLogin', // "externalLogin" | "socialLogin" | "emailLogin"
        },
      });

      await web3auth.initModal();
      const web3authProvider = await web3auth.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        web3authProvider as any
      );
      const web3AuthSigner = ethersProvider.getSigner();
      const config = {
        biconomyPaymasterApiKey: BICONOMY_API_KEY,
        bundlerUrl: url,
      };
      const smartWallet = await createSmartAccountClient({
        signer: web3AuthSigner,
        biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: chainConfig.rpcTarget,
        chainId: sepolia.id,
      });
      setSmartAccount(smartWallet);
      return smartWallet;
    } catch (error) {
      toast({
        title: 'Smart account creation failed',
      });
      return null;
    }
  };

  return useMutation({
    mutationKey: ['biconomy-instance', walletClient?.account],
    mutationFn: () => createSmartAccount(),
  });
};

export default useBiconomy;
