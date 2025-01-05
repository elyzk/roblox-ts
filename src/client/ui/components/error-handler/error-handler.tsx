import React from "@rbxts/react";
import { ErrorPage } from "./error-page";
import { ErrorBoundary } from "../error-boundary";

export function ErrorHandler({ children }: React.PropsWithChildren) {
	return (
		<ErrorBoundary
			fallback={(message: unknown) => {
				return <ErrorPage message={message} />;
			}}
		>
			{children}
		</ErrorBoundary>
	);
}