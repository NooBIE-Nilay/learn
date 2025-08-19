import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-100">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-slate-500/90 px-4 py-3 rounded text-lg">
            SignIn
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
