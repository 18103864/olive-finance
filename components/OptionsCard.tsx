'use client'

import { useState } from "react"
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import btc from '../public/images/bitcoin.png'
import { RefreshCcw } from 'lucide-react';
import Image from "next/image";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import WalletModal from "./WalletModal";


export default function OptionsCard(){
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [position, setPosition] = useState<string>("long");
    const [date, setDate] = useState<Date>();
    const [formValues, setFormValues] = useState<{
        selling: { currency: string; amount: string };
        buying: { type: string; amount: string };
        expiryDate: Date | undefined;
        strikePrice: string;
    }>({
        selling: { currency: 'btc', amount: '' },
        buying: { type: 'call', amount: '' },
        expiryDate: undefined,
        strikePrice: ''
      })
 
    return (
        <>
            <Card className="w-full max-w-xl mx-auto flex flex-col py-[40px] px-[16px]">
                <CardContent className="space-y-6 flex-grow overflow-auto">
                    <Tabs 
                        defaultValue="long"
                        className="w-full"
                        onValueChange={(value)=>setPosition(value)}
                    >
                        <TabsList className="grid w-full h-[56px] grid-cols-2 bg-[#F5F0F8] text-[#9B7EBD] p-2">
                            <TabsTrigger value="long" 
                                className={cn("data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3B1E54] data-[state=active]:to-[#9B7EBD] data-[state=active]:text-[#FDFDFD] h-[40px]")}>
                                Long
                            </TabsTrigger>
                            <TabsTrigger value="short" 
                                className={cn("data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3B1E54] data-[state=active]:to-[#9B7EBD] data-[state=active]:text-[#FDFDFD] h-[40px]")}>
                                Short
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="space-y-6">
                        <div className="flex justify-end mb-1">
                            <Button 
                                type="button" 
                                variant="ghostPink" 
                                size='icon' 
                                className="h-6 w-6 rounded-md bg-[#F5F0F8] p-0"
                                onClick={() => {
                                    setFormValues({
                                        selling: {currency: 'btc', amount:''},
                                        buying: { type: 'call', amount: ''},
                                        expiryDate: undefined,
                                        strikePrice: ''
                                    })
                                }}
                            >
                                <RefreshCcw className="text-[#9B7EBD] text-sm"/>
                                <span className="sr-only">Reset</span>
                            </Button>
                        </div>
                        <div className="space-y-0">
                            <Label className="font-medium">You&apos;re Selling</Label>
                            <div className="flex relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
                                    <Select value={formValues.selling.currency} onValueChange={(value) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, currency: value } }))}>
                                        <SelectTrigger className="w-[150px] h-[40px]">
                                        <div className="flex items-center space-x-2">
                                            <Image src={btc} alt="bitcoin" height={24} width={24}/>
                                            <SelectValue placeholder="Select"/>
                                        </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="btc" >BTC</SelectItem>
                                            <SelectItem value="eth">ETH</SelectItem>
                                            <SelectItem value="sol">SOL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={formValues.selling.amount}
                                    onChange={(e) => setFormValues(prev => ({ ...prev, selling: { ...prev.selling, amount: e.target.value } }))}
                                    className="flex-1 w-full h-[56px] text-right"
                                />
                            </div>
                        </div>
                        <div className="space-y-0">
                            <Label className="font-medium">You&apos;re Buying</Label>
                            <div className="flex relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
                                    <Select value={formValues.buying.type} onValueChange={(value) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, type: value } }))}>
                                        <SelectTrigger className="w-[150px] h-[40px]">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="call">Call</SelectItem>
                                        <SelectItem value="put">Put</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    className="flex-1 w-full h-[56px] text-right"
                                    value={formValues.buying.amount}
                                    onChange={(e) => setFormValues(prev => ({ ...prev, buying: { ...prev.buying, amount: e.target.value } }))}
                                />
                            </div>
                        </div>
                        <div className="space-y-0">
                            <Label className="font-medium">Expiry Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button 
                                        variant={'calendar'}
                                        className={cn("w-full justify-between text-left font-normal h-[56px] p-2",
                                            !formValues.expiryDate && "text-muted-foreground"
                                        )}
                                    >
                                        {formValues.expiryDate ? format(formValues.expiryDate, "MM/dd/yyyy") : <span className="font-normal">Enter Expiry Date</span>}
                                        <CalendarIcon className="ml-2 h-4 w-4 text-[#9B7EBD]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar 
                                        mode="single"
                                        selected={formValues.expiryDate}
                                        onSelect={(date) => {
                                            setFormValues(prev => ({ ...prev, expiryDate: date }))
                                            setDate(date)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-0">
                            <Label className="font-medium">Strike Price</Label>
                            <Input
                                type="number"
                                placeholder="Enter Strike Price"
                                value={formValues.strikePrice}
                                onChange={(e) => setFormValues(prev => ({ ...prev, strikePrice: e.target.value }))}
                                className="h-[56px] p-2"
                            />
                        </div>
                    </div>
                </CardContent>
                <div className="w-full flex justify-center items-center h-[56px] px-[24px]">
                    <Button variant={'selected'} className="w-full flex " onClick={() => setIsWalletModalOpen(true)}>
                        Connect Wallet to Trade
                    </Button>
                    <WalletModal 
                        isOpen={isWalletModalOpen} 
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                </div>
            </Card>
        </>
    )
}