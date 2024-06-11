import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <h1 className="text-red-300 underline">
        <UserButton afterSignOutUrl="/" />
      </h1>
    </main>
  );
}
