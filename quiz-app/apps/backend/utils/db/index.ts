import type { UserWebhookEvent, WebhookEvent } from "@clerk/express";
import BadRequestError from "../../errors/BadRequestError";
import { prisma } from "@repo/db/client";

export async function createUserInDb(event: WebhookEvent) {
  const { data, type } = event;
  if (type !== "user.created")
    throw new BadRequestError({ message: "Invalid Create User" });
  const {
    id,
    email_addresses,
    primary_email_address_id,
    first_name,
    last_name,
    phone_numbers,
    primary_phone_number_id,
  } = data;
  const dbResp = await prisma.user.create({
    data: {
      id,
      email: email_addresses.find((e) => e.id === primary_email_address_id)
        ?.email_address,
      phone: phone_numbers.find((p) => p.id === primary_phone_number_id)
        ?.phone_number,
    },
  });
}
export async function deleteUserFromDb(event: UserWebhookEvent) {
  const { data, type } = event;
  if (type !== "user.updated")
    throw new BadRequestError({ message: "Invalid Update User" });
}
export async function updateUserInDb({ data }: WebhookEvent) {
  if (data.object !== "user")
    throw new BadRequestError({ message: "Invalid object type" });
}
