import CryptoNav from "@/components/CryptoNav";
import NavBar from "@/components/NavBar";
import OptionsCard from "@/components/OptionsCard";



export default function Home() {
  return (
    <div className="space-y-6">
          <CryptoNav />
          <OptionsCard />
    </div>
  );
}
