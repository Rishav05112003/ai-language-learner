import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: "LingoAi - AI Language Learner",
  description: "Personalized AI language teacher",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
      <html lang="en" suppressHydrationWarning>
        <body
          
        >
          {/**header*/}
          {/**auth to be done using clerk or AuthO */}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/**footer */}
          <footer className="flex bg-muted py-12">
            <div className=" container  mx-auto text-center text-gray-600">
              <p>Made by Rishav</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
