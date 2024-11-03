"use client";

import { redirect, useSearchParams } from "next/navigation";

export default async function LoginPage() {
    const params = useSearchParams();

    if (params.get("method") == "o-auth-google") {
        fetch("http://localhost:3001/api/users/get-session-user")
            .catch((err) => {
                alert("No user found. " + err);
            })
            .then((res) => {
                alert("User id: " + res["id"]);
                redirect("/dashboard");
            });
    }

    return <div>LoginPage: {GoogleOAuthButton()}</div>;
}

function GoogleOAuthButton() {
    return (
        <a href="http://localhost:3001/api/users/google-o-auth">
            Log in using Google
        </a>
    );
}
