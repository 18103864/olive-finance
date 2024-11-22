'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PortfolioStat from "@/components/PortfolioStat"
import PortfolioCards from "@/components/PortfolioCards"
import { useState } from "react"



export default function PortfolioPage(){
    const [active, setActive] = useState<string>("Positions")

    const handleClickActive = (state:string) =>{
        if(state!==active){
            setActive(state);
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Portfolio Dashboard</h1>
            <PortfolioStat />
            <div className="flex justify-start gap-3">
                <Button
                    className={cn(buttonVariants({variant: active === 'Positions' ? 'selected' : 'unselected'}))}
                    onClick={()=>handleClickActive('Positions')}
                >Position</Button>
                <Button
                    className={cn(buttonVariants({variant: active === 'Transactions' ? 'selected' : 'unselected'}))}
                    onClick={()=>handleClickActive('Transactions')}
                >Transaction History</Button>
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-3xl">Open Positions</h1>
                    <Button variant='unselected'>Add New Position</Button>
                </div>
                <PortfolioCards />
            </div>
        </div>
    )
}