"use client";

import Image from "next/image";
import { Customer } from "@/app/lib/definitions";
import Link from "next/link";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function CustomerDetailsView({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <main>
      <div className="w-full rounded-md bg-white p-6 shadow">
        {/* Top section: Image, Name, Email */}
        <div className="flex items-center gap-4 border-b pb-4">
          <Image
            src={customer.image_url}
            className="rounded-full"
            alt={`${customer.name}'s profile picture`}
            width={48}
            height={48}
          />
          <div>
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <DevicePhoneMobileIcon className="mr-1 h-4 w-4" />
              <span>{customer.mobile}</span>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <EnvelopeIcon className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500 w-24">Email:</span>
            <span className="ml-2 text-base text-gray-900">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center">
            <HomeIcon className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500 w-24 ">Address:</span>
            <span className="ml-2 text-base text-gray-900 flex-1 break-words">
              {customer.address}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}
