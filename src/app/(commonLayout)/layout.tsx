import CustomNavbar from "@/src/components/shared/CustomNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CustomNavbar />
      <div className="lg:px-40 px-4">{children}</div>
    </div>
  );
}
