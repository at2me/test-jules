import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetDomainsQuery } from '@/lib/state/apiSlice';
import { JobsList } from './JobsList';

export function DomainsAccordion() {
  const { data: domains, isLoading, isError } = useGetDomainsQuery();

  if (isLoading) {
    return <div>Loading domains...</div>;
  }

  if (isError || !domains) {
    return <div>Error loading domains.</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {domains.map((domain) => (
        <AccordionItem key={domain.id} value={`item-${domain.id}`}>
          <AccordionTrigger>{domain.name}</AccordionTrigger>
          <AccordionContent>
            <JobsList domainId={domain.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
