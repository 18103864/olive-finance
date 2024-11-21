'use client'

import positionSvg from "@/public/svgs/positions.svg"
import { Card, CardContent} from "@/components/ui/card"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"


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
            <div className="flex gap-10">
                <div className="grid grid-cols-3 gap-4 mb-6 w-5/6">
                    <Card className="gap-6 flex flex-col justify-center items-start">
                        <CardContent className="space-y-3">
                            <div className="text-2xl font-normal">
                                Net Value
                            </div>
                            <div className="text-5xl font-semibold">
                                $10,561
                            </div>
                            <div className="text-base text-muted-foreground font-normal">
                                100 BTC
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="gap-6 flex flex-col justify-center items-start">
                        <CardContent className="space-y-3">
                            <div className="text-2xl font-normal">
                                Profits and Loss
                            </div>
                            <div className="text-5xl font-semibold">
                                $5,329
                            </div>
                            <div className="text-base text-muted-foreground font-normal">
                                100 BTC
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="gap-6 flex flex-col justify-center items-start">
                        <CardContent className="space-y-3">
                            <div className="text-2xl font-normal">
                                Points
                            </div>
                            <div className="text-5xl font-semibold">
                                8,712
                            </div>
                            <div className="text-base text-muted-foreground font-normal">
                                Data
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="border-none shadow-none">
                    <CardContent>
                        <Image src={positionSvg} alt="positions" width={200} height={200}/>
                    </CardContent>
                </Card>
            </div>
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
                <div className="grid grid-cols-5">
                    
                </div>
            </div>
        </div>
    )
}