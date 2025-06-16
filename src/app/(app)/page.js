"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "./action";
import { useActionState } from "react";

export default function Home() {
  const [_, action, pending] = useActionState(loginAction, null);

  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="w-[320px]">
        <CardContent>
          <form className="space-y-2" action={action}>
            <Input name="username" placeholder="username" />
            <Button disable={pending} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
