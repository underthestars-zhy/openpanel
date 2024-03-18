// import { CreateOrganization } from '@clerk/nextjs';

import { LogoSquare } from '@/components/logo';
import { redirect } from 'next/navigation';

import { getCurrentOrganizations, isWaitlistUserAccepted } from '@openpanel/db';

import { CreateOrganization } from './create-organization';

export default async function Page() {
  const organizations = await getCurrentOrganizations();
  if (process.env.BLOCK) {
    const isAccepted = await isWaitlistUserAccepted();
    if (!isAccepted) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-lg w-full">
            <LogoSquare className="w-20 md:w-28 mb-8" />
            <h1 className="font-medium text-3xl">Not quite there yet</h1>
            <div className="text-lg">
              We're still working on Openpanel, but we're not quite there yet.
              We'll let you know when we're ready to go!
            </div>
          </div>
        </div>
      );
    }
  }

  if (organizations.length > 0) {
    return redirect(`/${organizations[0]?.slug}`);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full">
        <CreateOrganization />
      </div>
    </div>
  );
}
