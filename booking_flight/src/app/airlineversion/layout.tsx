import "../globals.css";
import Navbar from "../ui/Navbar";
import Footer from "../ui/footer";

export default function AirlineversionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}