import Image from "next/image";
import Hero from "./ui/hero";
import Booking from "./ui/booking";
export default function Home() {
  return (
    <main >
      <section id="hero">
          <Hero></Hero>
      </section>
      <section>
          <Booking></Booking>
      </section>
    </main>
  );
}
