import { notFound } from 'next/navigation';

import { getOrganizationBySlug } from './services/organization.service';
import { getProjectById } from './services/project.service';

export async function getExists(organizationSlug: string, projectId?: string) {
  const promises: Promise<any>[] = [getOrganizationBySlug(organizationSlug)];

  if (projectId) {
    promises.push(getProjectById(projectId));
  }

  const results = await Promise.all(promises);

  if (results.some((res) => !res)) {
    return notFound();
  }

  return {
    organization: results[0] as Awaited<
      ReturnType<typeof getOrganizationBySlug>
    >,
    project: results[1] as Awaited<ReturnType<typeof getProjectById>>,
  };
}
