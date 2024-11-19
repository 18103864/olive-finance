'use client'

import { useEffect, useState } from "react";
import StrategyFilters from "./StrategyFilters";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Badge } from "./ui/badge";
import { HelpCircle } from 'lucide-react'

interface Strategy {
    type: "DC" | "O" | "B+O"| "SF"
    tvl: number
    apy: number
    depositAsset: string
    underlyingAsset: string
}

export default function StrategyCards(){
    const [sortBy, setSortBy] = useState<string>("featured");
    const [strategyType, setStrategyType] = useState<string>("all");
    const [depositAsset, setDepositAsset] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 10
    const [allStrategies, setAllStrategies] = useState<Strategy[]>([]);

    useEffect(() => {
        const generatedStrategies: Strategy[] = Array(20).fill({
            type: "O",
            tvl: 202132.57,
            apy: 5.22,
            depositAsset: "USDT",
            underlyingAsset: "ETH",
        }).map((strategy, index) => ({
            ...strategy,
            type: ["O"][index % 1] as Strategy["type"],
            depositAsset: ["BTC", "ETH", "USDT"][index % 3],
            tvl: Math.round((Math.random() * 500000 + 100000) * 100) / 100,
            apy: Math.round((Math.random() * 10 + 1) * 100) / 100,
        }));
        setAllStrategies(generatedStrategies);
    }, []);

    const filteredStrategies = allStrategies.filter(strategy => {
        if(strategyType !=='all' && strategy.type !== strategyType) return false;
        if(depositAsset !=="" && strategy.depositAsset !== depositAsset ) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'featured' ) return 0;
        if (sortBy === 'tvl') return b.tvl - a.tvl;
        if (sortBy === 'apy') return b.apy - a.apy;
        return 0
    })

    const totalPages = Math.ceil(filteredStrategies.length / cardsPerPage)
    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = filteredStrategies.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="w-full h-full space-y-6 flex flex-col justify-between">
            <StrategyFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                strategyType={strategyType}
                setStrategyType={setStrategyType}
                depositAsset={depositAsset}
                setDepositAsset={setDepositAsset}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {currentCards.map((strategy, index) => (
                    <Card key={index} className="w-full h-[382px]">
                        <CardHeader className="border-b-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-2"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M9.00061 3.74882C9.00149 3.44884 8.94238 3.15171 8.82675 2.87492C8.71112 2.59812 8.54131 2.34724 8.32731 2.13703C8.1133 1.92682 7.85942 1.76152 7.5806 1.65087C7.30178 1.54021 7.00364 1.48642 6.70373 1.49268C6.40381 1.49893 6.10818 1.56509 5.83421 1.68727C5.56024 1.80945 5.31347 1.98518 5.10841 2.20412C4.90335 2.42307 4.74414 2.68081 4.64014 2.96218C4.53615 3.24356 4.48947 3.54289 4.50285 3.84257C4.06201 3.95592 3.65273 4.1681 3.30603 4.46305C2.95933 4.758 2.68428 5.12797 2.50174 5.54495C2.31919 5.96193 2.23392 6.41499 2.2524 6.8698C2.27087 7.32462 2.39259 7.76926 2.60836 8.17007C2.22899 8.47827 1.93067 8.87449 1.73936 9.32427C1.54804 9.77405 1.46952 10.2638 1.51063 10.7508C1.55173 11.2379 1.71122 11.7075 1.97521 12.1188C2.2392 12.5302 2.5997 12.8708 3.02536 13.1111C2.97279 13.5177 3.00416 13.9309 3.11752 14.325C3.23088 14.719 3.42383 15.0857 3.68444 15.4023C3.94506 15.7189 4.26781 15.9787 4.63277 16.1656C4.99773 16.3526 5.39714 16.4628 5.80634 16.4893C6.21554 16.5159 6.62584 16.4583 7.0119 16.32C7.39795 16.1818 7.75158 15.9659 8.05093 15.6856C8.35027 15.4054 8.58899 15.0667 8.75233 14.6906C8.91567 14.3145 9.00017 13.9089 9.00061 13.4988V3.74882Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.75 9.75C7.37967 9.52849 7.92951 9.12525 8.33001 8.59125C8.7305 8.05726 8.96366 7.4165 9 6.75" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.50391 3.84375C4.51874 4.20655 4.62115 4.56037 4.80241 4.875" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.60938 8.172C2.74658 8.06025 2.8934 7.96087 3.04812 7.875" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.49869 13.5003C3.98181 13.5005 3.47364 13.3672 3.02344 13.1133" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 9.75H12" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 13.5H13.5C13.8978 13.5 14.2794 13.658 14.5607 13.9393C14.842 14.2206 15 14.6022 15 15V15.75" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 6H15" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 6V3.75C12 3.35218 12.158 2.97064 12.4393 2.68934C12.7206 2.40804 13.1022 2.25 13.5 2.25" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 10.125C12.2071 10.125 12.375 9.95711 12.375 9.75C12.375 9.54289 12.2071 9.375 12 9.375C11.7929 9.375 11.625 9.54289 11.625 9.75C11.625 9.95711 11.7929 10.125 12 10.125Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.5 2.625C13.7071 2.625 13.875 2.45711 13.875 2.25C13.875 2.04289 13.7071 1.875 13.5 1.875C13.2929 1.875 13.125 2.04289 13.125 2.25C13.125 2.45711 13.2929 2.625 13.5 2.625Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 16.125C15.2071 16.125 15.375 15.9571 15.375 15.75C15.375 15.5429 15.2071 15.375 15 15.375C14.7929 15.375 14.625 15.5429 14.625 15.75C14.625 15.9571 14.7929 16.125 15 16.125Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 6.375C15.2071 6.375 15.375 6.20711 15.375 6C15.375 5.79289 15.2071 5.625 15 5.625C14.7929 5.625 14.625 5.79289 14.625 6C14.625 6.20711 14.7929 6.375 15 6.375Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="font-bold">Strategy</span>
                                </div>
                                <Badge variant="secondary" className="bg-[#F0E8F6] hover:bg-[#F0E8F6]">
                                    {strategy.type}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex items-center space-x-2 font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M9.5 5.5H2.5C1.94772 5.5 1.5 5.94772 1.5 6.5V10C1.5 10.5523 1.94772 11 2.5 11H9.5C10.0523 11 10.5 10.5523 10.5 10V6.5C10.5 5.94772 10.0523 5.5 9.5 5.5Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M3.5 5.5V3.5C3.5 2.83696 3.76339 2.20107 4.23223 1.73223C4.70107 1.26339 5.33696 1 6 1C6.66304 1 7.29893 1.26339 7.76777 1.73223C8.23661 2.20107 8.5 2.83696 8.5 3.5V5.5" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                        <span className="text-sm">TVL: </span>
                                    </div>
                                    <div className="flex items-center space-x-2 font-bold">
                                        <span className="text-sm">${strategy.tvl.toLocaleString()}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                            <g clip-path="url(#clip0_792_7196)">
                                                <path d="M6.19531 11C8.95674 11 11.1953 8.76142 11.1953 6C11.1953 3.23858 8.95674 1 6.19531 1C3.43389 1 1.19531 3.23858 1.19531 6C1.19531 8.76142 3.43389 11 6.19531 11Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.19531 8V6" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.19531 4H6.20031" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_792_7196">
                                                <rect width="12" height="12" fill="white" transform="translate(0.199219)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                <div className="w-full h-1.5 rounded-full bg-[#EDE4F3]">
                                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD]" />
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <span className="text-sm">APY: </span>
                                    <span className="text-sm">{strategy.apy}%</span>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <span className="text-sm">Deposit Asset: </span>
                                    <span className="text-sm">{strategy.depositAsset}</span>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <span className="text-sm">Underlying Asset: </span>
                                    <span className="text-sm">{strategy.underlyingAsset}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination>
                <PaginationContent className="w-full flex justify-between items-center">
                <PaginationItem>
                    <PaginationPrevious
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) paginate(currentPage - 1);
                    }} 
                    />
                </PaginationItem>
                <div className="flex">
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                        <PaginationLink 
                            href="#" 
                            isActive={currentPage === index + 1}
                            onClick={(e) => {
                            e.preventDefault();
                            paginate(index + 1);
                            }}
                        >
                            {index + 1}
                        </PaginationLink>
                        </PaginationItem>
                    ))}
                </div>
                <PaginationItem>
                    <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) paginate(currentPage + 1);
                    }} 
                    />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}