export default function LoginPage() {
    return <div>LoginPage: {GoogleOAuthButton()}</div>;
}

function GoogleOAuthButton() {
    return (
        <a href="http://localhost:3001/api/users/google-o-auth">
            Log in using Google
        </a>
    );
}
