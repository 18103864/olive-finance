'use client'

import positionSvg from "@/public/svgs/positions.svg"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Positions{
    coin: string
    strategyType: "Put" | "Call"
    positionType: "Long" | "Short"
    expiry: string
    size: number
    pl: number
    delta: number
    gamma: number
    theta: number
    vega: number
}

const generateRandomPosition = (): Positions => {
    const coins = ["BTC", "ETH", "SOL"];
    const currentDate = new Date()
    const randomDate = new Date(currentDate.setMonth(currentDate.getMonth() + Math.floor(Math.random()*12)))

    return{
        coin: coins[Math.floor(Math.random()*coins.length)],
        strategyType: Math.random() > 0.5 ? "Call" : "Put",
        positionType: Math.random() > 0.5 ? "Long" : "Short",
        expiry: randomDate.toLocaleDateString(),
        size: Math.floor(Math.random() *20 ) + 1,
        pl: Math.floor(Math.random() * 1000 ) - 500,
        delta: Number((Math.random() * 2 - 1).toFixed(4)),
        gamma: Number((Math.random() * 0.1).toFixed(4)),
        theta: Number((-Math.random() * 0.2).toFixed(4)),
        vega: Number((Math.random() * 0.5).toFixed(4))
    }
}

export default function PortfolioPage(){
    const [active, setActive] = useState<string>("Positions")
    const [positions, setPositions] = useState<Positions[]>([])

    useEffect(()=>{
        const generatedPositions : Positions [] = Array(5).fill(null).map(generateRandomPosition)
        setPositions(generatedPositions)
    }, [])
    

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
                <div className="grid grid-cols-5 gap-4">
                    {positions.map((position, index) => (
                        <Card key={index} className="w-full h-[382px] space-y-6">
                            <CardHeader className="border-b-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold text-base">{position.coin}</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-[#F0E8F6] hover:bg-[#F0E8F6]">
                                        {position.strategyType}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-between space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <span className="font-medium text-xs">Position Type: </span>
                                    </div>
                                    <span className="font-medium text-xs">{position.positionType}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <span className="font-medium text-xs">Expiry: </span>
                                    </div>
                                    <span className="font-medium text-xs">{position.expiry}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <span className="font-medium text-xs">Size: </span>
                                    </div>
                                    <span className="font-medium text-xs">{position.size}</span>
                                </div>
                                <div className={position.pl > 0 ? "text-green-600 flex justify-between items-start" : "text-red-600 flex justify-between items-start"}>
                                    <div className="flex items-start">
                                        <span className="font-medium text-xs">P&L: </span>
                                    </div>
                                    <span className="font-medium text-xs">{Math.abs(position.pl)}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <span className="font-medium text-xs">Delta: </span>
                                        </div>
                                        <span className="font-medium text-xs">{position.delta}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <span className="font-medium text-xs">Gamma: </span>
                                        </div>
                                        <span className="font-medium text-xs">{position.gamma}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <span className="font-medium text-xs">Theta: </span>
                                        </div>
                                        <span className="font-medium text-xs">{position.theta}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <span className="font-medium text-xs">Vega: </span>
                                        </div>
                                        <span className="font-medium text-xs">{position.vega}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}