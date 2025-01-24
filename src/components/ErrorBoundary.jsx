import { useRouteError } from "react-router";
import NotFoundPage from "../pages/404.jsx";

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("🚀 ~ ErrorBoundary ~ error:", error);
  return (
    <>
      <NotFoundPage error={error} />
    </>
  );
} 