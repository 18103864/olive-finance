import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import btc from '../public/images/bitcoin.png'

export default function CryptoNav(){
    return <>
        <div className="flex items-center h-[56px] border-[1px] rounded-md p-4 gap-2">
            <div className={cn(buttonVariants({variant: 'outline'}),"flex items-center space-x-4 px-4")}>
                <div className="flex items-center space-x-2">
                    <Image src={btc} alt="bitcoin" height={24} width={24}/>
                    <span className="font-medium text-[#9B7EBD]">BTC</span>
                    <span className="text-red-500">↓ 1.30%</span>
                </div>
            </div>
            <div className={cn(buttonVariants({variant: 'outline'}),"flex items-center space-x-4 px-4")}>
                <div className="flex items-center space-x-2">
                    <Image src={btc} alt="bitcoin" height={24} width={24}/>
                    <span className="font-medium text-[#9B7EBD]">BTC</span>
                    <span className="text-red-500">↓ 1.30%</span>
                </div>
            </div>
            <div className={cn(buttonVariants({variant: 'outline'}),"flex items-center space-x-4 px-4")}>
                <div className="flex items-center space-x-2">
                    <Image src={btc} alt="bitcoin" height={24} width={24}/>
                    <span className="font-medium text-[#9B7EBD]">BTC</span>
                    <span className="text-red-500">↓ 1.30%</span>
                </div>
            </div>
        </div>
    </>
}