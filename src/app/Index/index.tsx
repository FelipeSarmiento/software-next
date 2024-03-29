"use client";
import React from "react";
import "@/settings/assets/globals.css";
import { SparklesCore } from "@/../src/app/components/AceternityUI/sparkles";
import { TextGenerateEffect } from "../components/AceternityUI/text-generate-effect";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../components/AceternityUI/canvas-reveal-effect";

export function Index() {
    const words = `Welcome to Software Next, where creativity meets simplicity in website creation!
Are you looking to build a stunning website without the hassle of coding? Look no further! Our intuitive platform empowers individuals and businesses to bring their ideas to life online, effortlessly.`

    return (
        <>
            <div className="h-[calc(100vh_-_84px)] w-full flex flex-col items-center pt-12 md:pt-28 xl:pt-40 2xl:pt-60 overflow-hidden rounded-md">
                <h1 className="md:text-6xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
                    <span className="text-cyan-500">Software Next</span>
                </h1>
                <div className="w-full md:w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.5}
                        maxSize={1}
                        particleDensity={1000}
                        className="w-full h-full"
                        particleColor="#1fbdd8"
                    />
                    <div className="absolute w-full px-4 xl:w-[200%] left-2/4 -translate-x-2/4 top-12 z-30 text-white">
                        <TextGenerateEffect className="text-center leading-normal text-2xl md:text-3xl" words={words} />
                    </div>

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
            <div className="pb-52 pt-5 w-full overflow-hidden rounded-md">
                <div className="flex flex-col lg:flex-row bg-white dark:bg-black w-full gap-4 mx-auto px-8">
                    <Card
                        title={
                        <span className="text-white text-xl text-center leading-normal">Build your website with ease, no programming knowledge needed</span>
                        }
                        icon={
                        <span className="text-white text-3xl px-5 text-center leading-normal font-extrabold">No coding Required</span>
                    }>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-900"
                        />
                    </Card>
                    <Card
                        title={
                        <span className="text-white text-xl text-center leading-normal">Choose from a wide range of professionally designed templates</span>
                        }
                        icon={
                        <span className="text-white text-3xl px-5 text-center leading-normal font-extrabold">Customizable Templates</span>
                    }>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-900"
                        />
                    </Card>
                    <Card
                        title={
                        <span className="text-white text-xl text-center leading-normal">See your changes go live immediately without the need for separate hosting</span>
                        }
                        icon={
                        <span className="text-white text-3xl px-5 text-center leading-normal font-extrabold">Instant Publishing</span>
                    }>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-900"
                        />
                    </Card>
                    <Card
                        title={
                        <span className="text-white text-xl text-center leading-normal">Need help?<br/>Our team is here to assist you every step of the way.</span>
                        }
                        icon={
                        <span className="text-white text-3xl px-5 text-center leading-normal font-extrabold">Dedicated Support:</span>
                    }>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-900"
                        />
                    </Card>
                </div>
            </div>
        </>
    );
}

const Card = ({
                  title,
                  icon,
                  children,
              }: {
    title: React.ReactNode;
    icon: React.ReactNode;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border group/canvas-card flex flex-col items-center justify-center border-white/[0.2]  max-w-sm w-full mx-auto p-4 h-[30rem] relative"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 w-full h-20">
                <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:hidden transition duration-200 w-full h-full flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <h2 className="text-white px-6 text-xl text-center opacity-0 group-hover/canvas-card:opacity-100 z-10 absolute  font-bold group-hover/canvas-card:text-white transition duration-200">
                {title}
            </h2>
        </div>
    );
};
export const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};