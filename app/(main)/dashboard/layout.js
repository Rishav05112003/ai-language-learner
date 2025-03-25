import react from "react"
import { Suspense } from "react"
import { DotLoader } from "react-spinners"

export default function Layout({children}){
    return (
        <div className="px-20">
            {children}
        </div>
    )
}