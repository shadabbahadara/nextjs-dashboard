"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    console.log(error);
    return { message: "Database error: failed to create invoice." };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
    return { message: "Database error: failed to update invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error(`Failed to delete invoice ${id}`);
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const CustomerFormSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  mobile: z.coerce.number(),
  email: z.string(),
  address: z.string(),
  imageUrl: z.string(),
});

const CreateCustomerFormSchema = CustomerFormSchema.omit({
  id: true,
});

export async function createCustomer(formData: FormData) {
  const { customerName, mobile, email, address, imageUrl } =
    CreateCustomerFormSchema.parse({
      customerName: formData.get("customerName"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      address: formData.get("address"),
      imageUrl: "/imageurl",
    });

  await sql`
    INSERT INTO customers (name, mobile, email, address, image_url)
    VALUES (${customerName}, ${mobile}, ${email}, ${address}, ${imageUrl})
  `;

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function updateCustomer(id: string, formData: FormData) {
  const { customerName, mobile, email, address, imageUrl } =
    CreateCustomerFormSchema.parse({
      customerName: formData.get("customerName"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      address: formData.get("address"),
      imageUrl: "/customers/male.png",
    });

  await sql`
    UPDATE customers
    SET name = ${customerName}, mobile = ${mobile}, email = ${email}, address  = ${address}, image_url = ${imageUrl}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string) {
    await sql`SELECT * FROM customers WHERE id = ${id}`;
  // revalidatePath("/dashboard/customers");
}
