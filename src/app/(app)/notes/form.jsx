"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import { useActionState, useEffect } from "react";
import { createNoteAction } from "./action";
import { toast } from "sonner";

export const Form = ({ username }) => {
  const [state, action, pending] = useActionState(createNoteAction, null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <form className="space-y-2" action={action}>
      <Input name="title" placeholder="title" />
      <Textarea name="deskripsi" placeholder="deskripsi" />
      <Input name="price" placeholder="harga" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar name={username} className="w-6 h-6" variant="beam" />
          <div className="font-medium text-sm">Posted as {username}</div>
        </div>
        <Button disabled={pending}>Add Note</Button>
      </div>
    </form>
  );
};
