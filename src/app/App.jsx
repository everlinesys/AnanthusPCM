import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import InstallButton from "../public/components/InstallButton";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <InstallButton />
    </>
  );
}