import React from "react";
import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<StateContext>
				<Layout>
					<Toaster />
					<Component {...pageProps} />
				</Layout>
			</StateContext>
		</SessionProvider>
	);
}

export default MyApp;
