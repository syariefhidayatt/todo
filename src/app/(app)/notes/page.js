import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import moment from "moment";
import { Form } from "./form";
import { getUsername } from "@/utils/getUsername";

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(`https://v1.appbackend.io/v1/rows/QfCptJEpHB3X/?filterKey=username&filterValue=${username}`);
  const { data: notes } = await res.json();

  return (
    <div className="space-y-4 py-8">
      <h3>All Notes</h3>
      <Form username={username} />
      <div className="space-y-4">
        {notes.map((note) => {
          return (
            <Card key={note._id}>
              <CardContent className="space-y-2">
                <h3 className="text-lg font-medium">{note.title}</h3>
                <p className="text-sm">{note.content}</p>
                <p className="text-sm text-zinc-300">{moment(note.createdAt).format("MMM Do, YYYY")}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
