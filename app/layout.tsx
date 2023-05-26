"use client";
import { ChatProvider } from "@/context/ChatProvider";
import "./globals.css";
import { ChakraProviders } from "./chakra-providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="App">
        <ChatProvider>
          <ChakraProviders>{children}</ChakraProviders>{" "}
        </ChatProvider>
      </body>
    </html>
  );
}
