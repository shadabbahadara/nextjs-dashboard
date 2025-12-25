import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import CustomerForm from "@/app/ui/customers/customer-create-form";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <CustomerForm />
    </main>
  );
}
