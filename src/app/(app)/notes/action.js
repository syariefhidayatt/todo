"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function createNoteAction(_, formData) {
  const title = formData.get("title");
  const deskripsi = formData.get("deskripsi");
  const username = await getUsername();
  const price = formData.get("price");

  await fetch("https://v1.appbackend.io/v1/rows/ArOFaxLuMc8R", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, deskripsi, username, price }]),
  });

  revalidatePath("/notes");

  return {
    status: "success",
    message: "Note has been added!",
  };
}
