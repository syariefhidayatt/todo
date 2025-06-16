import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import moment from "moment";
import "moment/locale/id";
import { Form } from "./form";
import { getUsername } from "@/utils/getUsername";
import { Wallet, Calendar, FileText } from "lucide-react";

moment.locale("id");

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/ArOFaxLuMc8R/?filterKey=username&filterValue=${username}`
  );
  const { data: notes } = await res.json();

  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Catatan Servis Motor</h1>
        <p className="text-muted-foreground">
          Semua riwayat perbaikan motormu ada di sini.
        </p>
      </div>

      <Form username={username} />

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card key={note._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground">{note.content}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Wallet className="h-4 w-4" />
                  <span className="font-medium">{formatCurrency(note.price)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Dibuat {moment(note._createdAt).format("MMM Do, YYYY")}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">Belum Ada Catatan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Silakan tambahkan catatan servis pertama Anda menggunakan form di atas.
          </p>
        </div>
      )}
    </div>
  );
}