'use client'
import {SignUpForm} from "../../components/AceternityUI/sign-up-form";
import {BackgroundGradient} from "../../components/AceternityUI/background-gradient";
export default function Home(){

    return (
        <div className="min-h-[calc(100vh_-_84px)] px-4 py-10 flex items-center justify-center ">
            <BackgroundGradient containerClassName="w-full md:w-3/4 xl:w-2/4">
                <SignUpForm/>
            </BackgroundGradient>
        </div>
    )
}