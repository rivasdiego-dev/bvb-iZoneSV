'use client'

import { useState } from "react";
import { firebaseAuth } from "@/firebase/app";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {}

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

    const handleGoogleLogin = () => {
        signInWithPopup(firebaseAuth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("id", user.uid);

                // IdP data available using getAdditionalUserInfo(result)

                console.log({ USER: user, CREDENTIAL: credential });
                router.replace("/");

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setLogin((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    return (
        <div className="border h-full flex flex-col px-6 justify-center border-lime-600">
            <div className="px-8 py-4 bg-neutral-900 rounded border border-sky-600">
                <h1 className="">
                    Sign in to your account
                </h1>
                <form className="space-y-6 mt-4" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className=""
                        >
                            Your email
                        </label>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            id="email"
                            className=""
                            placeholder="user@email.com"
                            required={true}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className=""
                        >
                            Password
                        </label>
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className=""
                            required={true}
                        />
                    </div>

                    <button
                        type="submit"
                        className=""
                    >
                        Sign in
                    </button>
                </form>

                <p className="w-full text-center"> or </p>
                <button
                    onClick={handleGoogleLogin}
                    className=""
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
} 