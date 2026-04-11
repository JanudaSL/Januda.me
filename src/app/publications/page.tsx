import type { Metadata } from "next";
import Pub1 from "./pub";
import Publicatiopn from './Publicatiopn'

export const metadata: Metadata = {
  title: "Publications",
};

export default function publications() {
  return (
    <section className="px-0 py-0">
       <Publicatiopn />
      <Pub1 />
     
    </section>
  );
}