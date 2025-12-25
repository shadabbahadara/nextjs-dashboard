import { fetchCustomerById, fetchCustomers } from "@/app/lib/data";
import CustomerDetailsForm from "@/app/ui/customers/customer-details-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const customerId = params.id;
  const customer = await fetchCustomerById(customerId);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Customer Details",
            href: "/dashboard/customers/${id}/view",
            active: true,
          },
        ]}
      />
      <CustomerDetailsForm customer={customer} />
    </main>
  );
}
