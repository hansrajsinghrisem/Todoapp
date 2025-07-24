import "./globals.css";
import Toast from "./Toaster/Toast";

export const metadata = {
  title: "TO-DO List App",
  description: "By Hansraj",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toast/>
        {children}
      </body>
    </html>
  );
}
