'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import Image, { StaticImageData } from "next/image"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"
import solfare from '@/public/images/solfare.png'
import phantom from '@/public/images/phantom.png'
import turnkey from '@/public/images/turnkey.png'
import backpack from '@/public/images/backpack.png'
import coinbase from '@/public/images/coinbase.png'

interface WalletModalProps {
    isOpen: boolean
    onClose: () => void
}

interface Wallet{
    name: string,
    icon: StaticImageData,
}

const allWallets: Wallet[] = [
    {name: "Solfare", icon: solfare},
    {name: "Phantom", icon: phantom},
    {name: "Turnkey", icon: turnkey},
    {name: "Backpack", icon: backpack},
    {name: "Coinbase Wallet", icon: coinbase},
    {name: "Ledger", icon: coinbase},
    {name: "Fuse Wallet", icon: coinbase},
    {name: "Dynamic", icon: coinbase},
    {name: "Trezor", icon: coinbase},
    {name: "Capsule", icon: coinbase},
    {name: "OKX", icon: coinbase},
    {name: "Keystone", icon: coinbase},
    {name: "Privy", icon: coinbase},
    {name: "Web3Auth", icon: coinbase},
    {name: "Bitget", icon: coinbase},
    {name: "Exodus", icon: coinbase},
    {name: "Circle", icon: coinbase},
    {name: "Binance Web3 Wallet", icon: coinbase},
    {name: "Brave", icon: coinbase},
    {name: "Rabinhood", icon: coinbase},
    {name: "Gem Wallet", icon: coinbase},
    {name: "Tiplink", icon: coinbase},
    {name: "Trust", icon: coinbase},
    {name: "Okto", icon: coinbase},
    {name: "Helium", icon: coinbase},
    {name: "Crossmint Non-Custodial", icon: coinbase},
    {name: "Crossmint Custodial", icon: coinbase},
    {name: "Decaf", icon: coinbase},
    {name: "WalletConnect", icon: coinbase},
    {name: "I don't have Solana Wallet", icon: coinbase},
]

const WalletButton = ({ name, icon }: Wallet) => (
    <Button
      variant="outline"
      className="flex items-center justify-start w-full h-[40px] px-[16px] py-[8px]"
    >
      <Image src={icon} alt={name} width={24} height={24} className="rounded-full" />
      <span className="text-sm font-normal text-center">{name}</span>
    </Button>
  )

export default function WalletModal({isOpen, onClose} : WalletModalProps){
    const [isMoreWalletOpen, setIsMoreWalletOpen] = useState(false);
    const primaryWallets = allWallets.slice(0,9);
    const moreWallets = allWallets.slice(9)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-7xl md:max-w-5xl sm:max-w-2xl max-h-[90%] p-[40px]">
                <DialogHeader className="flex flex-row items-center justify-between pb-[20px]">
                        <DialogTitle className="text-2xl">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="space-y-10">
                    <div className="space-y-5 flex flex-col justify-between">
                        <div className="grid grid-cols-3 gap-5">
                            {primaryWallets.map((wallet) => (
                                <WalletButton key={wallet.name} {...wallet} />
                            ))}
                        </div>
                        <div id="more-wallets"
                            className={cn(
                            "grid grid-cols-3 gap-4 transition-all duration-200 mb-4",
                            isMoreWalletOpen ? "opacity-100" : "hidden opacity-0"
                        )}>
                            {moreWallets.map((wallet) => (
                                <WalletButton key={wallet.name} {...wallet} />
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="selected"
                        className="w-full flex justify-between"
                        onClick={() => setIsMoreWalletOpen(!isMoreWalletOpen)}
                    >
                        {isMoreWalletOpen ? "Less" : "More"} Wallets
                        {isMoreWalletOpen ? (<ChevronUp />):(<ChevronDown />)}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}