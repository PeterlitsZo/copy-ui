import { Navigate } from "react-router";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Copy UI" },
    { name: "description", content: "The Copy UI." },
  ];
}

export default function Home() {
  return <Navigate to="/v0/components/Avatar" replace />;
}
