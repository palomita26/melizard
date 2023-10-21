
import Image from "next/image";
import HamburgerMenu from "./components/HamburgerMenu";
import PostsView from "./components/PostsView";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <HamburgerMenu />
      </div>

      <div className="place-items-center p-16">
        <Image
          src="/melizard.jpeg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <PostsView/>
      
    </main>
  );
}
