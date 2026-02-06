import { MiniKitProvider } from '@farcaster/minikit';  // или из OnchainKit
// ...
<MiniKitProvider>
  {children}
</MiniKitProvider>

import { Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'base:app_id': '69863c638dcaa0daf5755ff1',
  },
};

export default function Home() {
  return <div>{/* Your page content */}</div>;
}
