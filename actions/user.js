"use server";
import { db } from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server"
import { generateAIInsights } from "./dashboard";
import select from "daisyui/components/select";
import { revalidatePath } from "next/cache";

export async function updateUser(data) {
    const {userId} = await auth();
    //console.log(userId);
    
    if(!userId) throw new Error("Unthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserid : userId,
        },
    });

    if(!user) throw new Error("User not Found");
    console.log("user:",user);
    
    
    try {
        // find if the language exists
        // start a transaction
        const result = await db.$transaction(
            async(tx) => {
                console.log(data.language);
                
                let languageInsight = await tx.languageInsight.findUnique({
                    where:{
                        language: data.language,
                    },
                });

                console.log("language insights : ",languageInsight);
                
                //if the language dosnt exist
                if(!languageInsight){
                    // make the function later
                    const insights = await generateAIInsights(data.language);
                    console.log(insights);
                    

                    languageInsight = await db.languageInsight.create({
                        data:{
                            language: data.language,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7*24*60*60*1000),
                        },
                    });
                }
                

                // update user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        language: data.language, //language he wants to learn
                        nativeLang: data.nativeLang,
                        age : data.age,
                    },
                });

                return {updateUser, languageInsight};
            },
            {
                timeout: 10000,
            }
        );

        revalidatePath("/");
        return result.user;
        
    } catch (error) {
        console.error(error.message);
        console.error("failed to update user profile");
        throw new Error("failed to update user");
    }
}


export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserid : userId,
        },
    });

    if(!user) throw new Error("User not Found");
    
    try {
        const user = await db.user.findUnique({
            where:{
                clerkUserid: userId,
            },
            select:{
                language:true,
            },
        });

        return{
            isOnboarded : !!user?.language,
        };
    } catch (error) {
        console.error(error.message);
        throw new Error("falied to check onboarding status");
    }
}
    