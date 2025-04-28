"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className=" relative w-full flex items-center justify-center">
      <Navbar className="top-2 border-black" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(" fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 border-black", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRlfGVufDB8fDB8fHww"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-e298-622f-84f9-378060e99a39/raw?se=2025-04-26T18%3A14%3A17Z&sp=r&sv=2024-08-04&sr=b&scid=7e682537-dabf-5d21-bab4-b222454d7b3a&skoid=365eb242-95ba-4335-a618-2c9f8f766a86&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-26T17%3A06%3A30Z&ske=2025-04-27T17%3A06%3A30Z&sks=b&skv=2024-08-04&sig=//wkHfnId0VC1KqaAYB9C0NsUxdLt2qW0BYnzHAJ4Ss%3D"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <div className="absolute right-4 bottom-4 flex justify-end space-x-4 bg-accent bg-opacity-10 backdrop-blur-sm rounded-full py-2 px-4">
            <HoveredLink href="/login">Create account</HoveredLink>
        </div>
      </Menu>     
    </div>
  );
}
