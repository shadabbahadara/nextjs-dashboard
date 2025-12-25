import { fetchCustomerById, fetchCustomers } from "@/app/lib/data";
import CustomerEditForm from "@/app/ui/customers/customer-edit-form";
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
            label: "Edit Customer",
            href: "/dashboard/customers/${id}/edit",
            active: true,
          },
        ]}
      />
      <CustomerEditForm customer={customer} />
    </main>
  );
}
