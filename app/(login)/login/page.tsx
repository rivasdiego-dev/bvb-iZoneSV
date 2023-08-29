'use client'

import { firebaseAuth } from "@/firebase/app";
import { User } from "@/firebase/interfaces";
import { CreateDefaultUser, UserExists } from "@/firebase/services/userAuth";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { Hammersmith_One, Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

type Props = {}

const volleyImage = '/logo.png'
const hammerSmith = Hammersmith_One({ subsets: ["latin-ext"], weight: ["400"] })
const roboto = Roboto({ subsets: ["latin-ext"], weight: ["100", "300", "400", "500", "700", "900"] })
const inputClassname = 'rounded block w-full p-2.5 bg-secondary-900 bg-opacity-50 placeholder-gray-400 text-white focus:outline-none'

export default function Page({ }: Props) {

    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseAuth, login.email, login.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log({ USER: user, CREDENTIAL: userCredential });
                localStorage.setItem("id", user.uid);
                router.replace("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);

            // The signed-in user info: result.user
            const user: User = {
                displayName: result.user.displayName,
                email: result.user.email,
                id: result.user.uid,
                roles: [],
            };

            // Check if user exists
            if (!(await UserExists(user.id)))
                // If user doesn't exist, create default user
                await CreateDefaultUser(user);

            localStorage.setItem("id", user.id);
            router.replace("/");

        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setLogin((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    return (
        <div className="h-full flex flex-col gap-6 p-12">

            {/* Logo and title */}
            <div className="h-full">
                <Image
                    className='m-auto my-6'
                    alt=''
                    src={volleyImage}
                    height={200}
                    width={200}
                />
                <h1 className={'text-center w-full tracking-tighter text-5xl ' + hammerSmith.className}> BVB iZone </h1>
                <h1 className={'text-center w-full tracking-wide text-xl'}> Log in </h1>
            </div>

            {/* Form */}
            <div className="h-full flex flex-col sm:w-1/3 sm:mx-auto">
                {/* Google Sign In */}
                <button onClick={handleGoogleLogin} className={"flex items-center mx-auto mb-6 py-2 px-4 gap-4 rounded text-lg tracking-tight whitespace-nowrap font-medium sm:w-max text-neutral-600 bg-white " + roboto.className} >
                    <FaGoogle className="text-xl w-1/2 sm:w-fit text-secondary" />
                    <p className=""> Sign in with Google </p>
                </button>

                {/* Divider */}
                <div className='flex items-center px-4'>
                    <div className='w-full h-0 border' />
                    <p className='w-1/2 text-lg text-center'> or </p>
                    <div className='w-full h-0 border' />
                </div>

                {/* Email and password sign in */}
                <form className="space-y-6 mt-4" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-white text-sm tracking-wider"
                        >
                            Your email
                        </label>
                        <input
                            onChange={handleInputChange}
                            autoComplete="off"
                            type="email"
                            name="email"
                            id="email"
                            className={inputClassname}
                            placeholder="user@email.com"
                            required={true}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-white text-sm tracking-wider"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className={inputClassname}
                            required={true}
                        />
                    </div>

                    <button
                        type="submit"
                        className={"w-full rounded-lg p-2.5 text-2xl font-medium from-primary to-primary-600 bg-gradient-to-tr " + roboto.className}
                    >
                        Sign in
                    </button>
                </form>
                <button className="mt-2" onClick={() => { router.replace('/') }}> Go back home </button>
            </div>
        </div>
    )
} 