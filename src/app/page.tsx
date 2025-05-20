import GoogleSheetTable from "@/components/GoogleSheetTable";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-[32px] items-center sm:items-start p-8 sm:p-20">
        <GoogleSheetTable />
      </div>
    </div>
  );
}
