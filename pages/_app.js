import React from "react";
import "../styles/globals.css";
import { Layout, Loader } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const Auth = ({ children }) => {
		const router = useRouter();
		const { status } = useSession({
			required: true,
			onUnauthenticated() {
				router.push("/unauthorized?message=login required");
			},
		});
		if (status === "loading") {
			//TO-DO: add loader
			return <Loader />;
		}
		return children;
	};

	return (
		<SessionProvider session={session}>
			<StateContext>
				<Layout>
					<Toaster />
					{Component.auth ? (
						<Auth>
							<Component {...pageProps} />
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</Layout>
			</StateContext>
		</SessionProvider>
	);

	
}

export default MyApp;
