"use client";

import { Customer, CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import { useActionState } from "react";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createCustomer, updateCustomer } from "@/app/lib/actions";

export default function CustomerEditForm({ customer }: { customer: Customer }) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  return (
    <form action={updateCustomerWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm font-medium"
          >
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="text"
                defaultValue={customer.name}
                placeholder="Enter customer name"
                maxLength={50}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="mb-2 block text-sm font-medium">
            Mobile
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                defaultValue={customer.mobile}
                placeholder="Enter mobile number"
                pattern="^\d{10}$"
                minLength={10}
                maxLength={10}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Please enter a valid 10-digit mobile number."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
                required
              />
              <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={customer.email}
                placeholder="Enter email id"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                autoComplete="email"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="address"
                name="address"
                defaultValue={customer.address}
                placeholder="Enter address"
                maxLength={255}
                rows={3}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                autoComplete="address"
              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/4 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
