'use client'
import Link from "next/link";
import { Moon, Sun } from 'lucide-react'

import { Button, buttonVariants } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WalletModal from "./WalletModal";

export default function NavBar(){
    const [active, setActive] = useState<string>("Options");
    const [isDark, setIsDark] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const handleClick = (state:string) =>{
        if(active!==state){
            setActive(state)
        }
    }


    return <>
        <div className="">
            <header className="bg-[#FDFDFD] border-gray-200">
                <div className="flex h-[40px] items-center mx-auto">
                    <nav className="flex items-center space-x-4">
                        <Link href='/' 
                            className={cn(buttonVariants({variant: active === "Options" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Options')}
                        >
                            Options
                            <span className="ml-2 rounded px-1.5 py-0.5 text-xs border">
                                BETA
                            </span>
                        </Link>
                        <Link href='/earn'
                            className={cn(buttonVariants({variant: active === "Earn" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Earn')}
                        >
                            Earn
                        </Link>
                        <Link href='/portfolio'
                            className={cn(buttonVariants({variant: active === "Portfolio" ? "selected" : 'unselected'}))}
                            onClick={() => handleClick('Portfolio')}
                        >
                            Portfolio
                        </Link>
                        <DropdownMenu onOpenChange={() => handleClick('More')}>
                            <DropdownMenuTrigger asChild>
                                <Button variant={active === "More" ? "selected":'unselected'}
                                >
                                    More
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-48 text-[#9B7EBD]">
                                {[
                                    "Move",
                                    "Leverage Tokens",
                                    "Liquidity",
                                    "Swaption",
                                    "Stocks",
                                    "Bridge",
                                    "Net Worth",
                                    "Prediction Markets",
                                    "Data",
                                    "Copy Trader",
                                    "Docs"
                                    ].map((item) => (
                                    <DropdownMenuItem key={item} className="focus:bg-[#F3EDF7] focus:text-[#9B7EBD]">
                                        <Link href={`/`} className="w-full">
                                        {item} (soon)
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className={cn(buttonVariants({variant: 'unselected'}),"flex items-center")}>
                            <Switch 
                                checked={isDark}
                                onCheckedChange={toggleTheme}
                                className="data-[state=checked]:bg-[#3B1E54] data-[state=unchecked]:bg-[3B1E5480]"
                            />
                            {isDark ? <Moon className="h-[24px] w-[24px]" /> : <Sun className="h-[24px] w-[24px]" />}
                        </div>
                        <Button variant='selected' onClick={() => setIsWalletModalOpen(true)}>
                            Connect Wallet
                        </Button>
                        <WalletModal 
                        isOpen={isWalletModalOpen} 
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                    </div>
                </div>
            </header>
        </div>
    </>
}