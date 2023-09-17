import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import axios from "axios";
import {
  securingLocalStorage,
  KeySecuringLocalStorage,
  TypeSecuringLocalStorage,
} from "@/core/cryptography";

export default function App({ Component, pageProps }: AppProps) {
  interface IData {
    publicKey: string;
  }

  interface ServerSetting {
    data: IData;
    message: string;
    statusCode: number;
  }

  const callServiceGetInitial = async () => {
    try {
      const res = await axios<ServerSetting>({
        url: `${process.env.HOST_SERVICE}/setting/server`,
        method: "get",
      });
      securingLocalStorage(
        TypeSecuringLocalStorage.Set,
        KeySecuringLocalStorage.ServerPublicKey,
        atob(res.data.data.publicKey)
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    callServiceGetInitial();
  }, []);
  return <Component {...pageProps} />;
}
