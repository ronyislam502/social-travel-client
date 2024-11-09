import CustomNavbar from "@/src/components/shared/CustomNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CustomNavbar />
      <div className="">{children}</div>
    </div>
  );
}
