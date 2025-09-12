import { Navigate } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Copy UI" },
    { name: "description", content: "The Copy UI." }
  ];
}

export default function Home() {
  return <Navigate to="/components/Button" replace />;
}
