import CryptoNav from "@/components/CryptoNav";
import NavBar from "@/components/NavBar";
import OptionsCard from "@/components/OptionsCard";



export default function Home() {
  return (
    <div className="p-[40px] space-y-6">
          <NavBar />
          <CryptoNav />
          <OptionsCard />
    </div>
  );
}
