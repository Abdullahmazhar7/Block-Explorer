
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Alchemy, Network } from 'alchemy-sdk';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings);

export default function Landing() {

  const [blockNumber, setBlockNumber] = useState(null);
  const [gasPrice, setGasPrice] = useState(null);
  const [minerAddress, setMinerAddress] = useState(null);
  const [contractAddress, setContractAddress] = useState("");
  const [balance, setBalance] = useState(null);
  
  
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();

  });

   useEffect(() => {
    async function fetchGasPrice() {
      try {
        const price = await alchemy.core.getGasPrice();
        setGasPrice(price);
      } catch (error) {
        console.error("Error fetching gas price:", error);
      }
    }
    fetchGasPrice();

  }, []);

  useEffect(() => {
    async function fetchMinerAddress() {
      try {
        const block = await alchemy.core.getBlock('latest');
        setMinerAddress(block.miner);
      } catch (error) {
        console.error("Error fetching miner address:", error);
      }
    }

    fetchMinerAddress();
  }, []);

  const handleFetchBalance = async () => {
    try {
      const balance = await alchemy.core.getBalance(contractAddress);
      setBalance(balance);
    } catch (error) {
      console.error("Error fetching contract balance:", error);
    }
  };

  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <h1 className="text-2xl">BlockExplorer</h1>
        <Link className="flex items-center justify-center" href="#">
          <BitcoinIcon className=" ml-2 h-6 w-6" />
          <span className="sr-only">BlockExplorer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className=" text-sm font-medium hover:underline underline-offset-4"
            href="#explore">
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#metrices">
            Metrics
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#accounts">
            Accounts
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-4">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div
              className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1
                  className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  BlockExplorer: Unlock the Power of Blockchain
                </h1>
                <p
                  className="mx-auto max-w-[700px] text-gray-600">
                  Explore the blockchain with our powerful BlockExplorer. Dive into the latest blocks, transactions, and
                  more.
                </p>
                <div className="space-x-4 mt-6 mb-4">
                  <Link
                    className="inline-flex h-10 px-4 py-4 items-center justify-center rounded-md bg-gray-900 text-white"
                    href="#">
                    Explore BlockExplorer
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Latest Block</CardTitle>
                      <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{blockNumber !== null ? blockNumber : "Loading..."}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Gas Price</CardTitle>
                      <TicketIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{gasPrice !== null ? gasPrice.toString() : "Loading..."}</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Addresses</CardTitle>
                      <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,350,000</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Miner Address</CardTitle>
                      <CoinsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold"> {minerAddress !== null ? `${minerAddress.slice(0, minerAddress.length / 2)}...` : "Loading..."} </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            {/* <div className="mx-auto w-full max-w-2xl">
              <form className="flex space-x-2">
                <Input
                  className="flex-1"
                  placeholder="Search for blocks, transactions, or addresses"
                  type="text" />
                <Button type="submit">
                  <SearchIcon className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div> */}
          </div>
        </section>
        <section id="explore" className="w-full py-12 md:py-24 lg:py-32 bg-white border-4">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore the Blockchain</h2>
              <p
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Dive into the latest blocks, transactions, and more with our powerful BlockExplorer.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-200 px-3 py-3"
                href="#">
                Explore Blocks
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border bg-black text-white px-2 py-2"
                href="#">
                Explore Transactions
              </Link>
            </div>
          </div>
        </section>
        <section id="metrices" className="w-full py-12 md:py-24 lg:py-32 border-4">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blockchain Metrics</h2>
              <p
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay up-to-date with the latest blockchain metrics and trends.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Hash Rate</CardTitle>
                  <HashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+125 EH/s</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Difficulty</CardTitle>
                  <DiffIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+21.5 T</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Block Time</CardTitle>
                  <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+10 min</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Transaction Fee</CardTitle>
                  <CoinsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+0.00025 BTC</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="accounts" className="w-full py-12 md:py-24 lg:py-32 bg-white border-4">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Accounts</h2>
              <p
                className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check your balance or someone else's balance by entering a contract number.
              </p>
            </div>
            <Card className="mt-4">
        <CardHeader>
          <CardTitle>Fetch Contract Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Enter Contract Address"
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <Button onClick={handleFetchBalance}>Fetch Balance</Button>
          </div>
          {balance !== null && (
            <p className="mt-4">Contract Balance: {balance.toString()}</p>
          )}
        </CardContent>
      </Card>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 BlockExplorer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

function BitcoinIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>)
  );
}


function BlocksIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path
        d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>)
  );
}


function ClockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function CoinsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>)
  );
}


function DiffIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 3v14" />
      <path d="M5 10h14" />
      <path d="M5 21h14" />
    </svg>)
  );
}


function HashIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function TicketIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}




























