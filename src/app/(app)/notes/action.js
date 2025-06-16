"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function createNoteAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const username = await getUsername();

  await fetch("https://v1.appbackend.io/v1/rows/QfCptJEpHB3X", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, content, username }]),
  });

  revalidatePath("/notes");

  return {
    status: "success",
    message: "Note has been added!",
  };
}
