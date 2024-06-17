import Image from "next/image";
import Hero from "../../ui/hero";
import Booking from "../../ui/booking";
import PopularRoutes from "../../ui/PopularRoutes";
import Footer from "../../ui/footer";
import Whybookwithus from "@/app/ui/whybookus";
export default function Home() {
  return (
    <main>
      <section id="hero">
          <Hero></Hero>
      </section>
      <section id="Booking" className="flex-center">
          <Booking></Booking>
      </section >
      <section id="Popular Routes" className="w-full h-full flex-center mt-24">
          <PopularRoutes></PopularRoutes>
      </section>
      <section id='About Us' className="w-full h-full  flex-center mt-24">
          <Whybookwithus></Whybookwithus>
      </section>
      
    </main>
  );
}
