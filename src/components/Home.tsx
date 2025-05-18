import { Braces } from "lucide-react";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

function Home() {
  const { isSignedIn } = useUser();

  console.log(isSignedIn);

  if (isSignedIn) {
    window.location.href = "/dashboard";
  }

  return (
    <>
      <nav className="flex justify-between px-10 py-3 bg-[#101012] ">
        <div className="flex items-center">
          <Braces className="text-purple-600 h-10 w-8" />
          <span className="font-bold text-2xl pl-2 text-white">
            Code Nimbus
          </span>
        </div>
        <div className="flex gap-2 ">
          {/* <ModeToggle /> */}
          {/* <SignedOut>
            <SignInButton>
              <button className="text-white  hover:bg-white hover:text-black w-28 h-10 border-none rounded-md cursor pointer font-bold transition delay-75 ">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          {/* <button className="text-white  hover:bg-white hover:text-black w-20 h-10 border-none rounded-md cursor pointer font-bold transition delay-75">
            Log In
          </button>
          <button className="text-white  bg-purple-600 hover:bg-purple-700 w-28 h-10 border-none rounded-md font-bold cursor pointer transition delay-75">
            Get Started
          </button> */}
        </div>
      </nav>

      <section className="py-20 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Code Smarter, Build Faster
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              A powerful, lightweight code editor designed for modern
              developers. Write, debug, and deploy your code from anywhere.
            </p>
            <div className="flex gap-4 justify-center">
              <SignedOut>
                <SignInButton>
                  <button className="bg-purple-600 hover:bg-purple-700 w-28 h-10 border-none rounded-md font-bold cursor-pointer transition delay-75 text-white">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>

              {/* <button  className="text-white  hover:bg-white hover:text-black w-34 h-10 border-none rounded-md cursor pointer font-bold transition delay-75 border-2 border-white">
         Try Web Version
       </button> */}
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-zinc-800 shadow-2xl max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-3 flex items-center gap-2 border-b border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-zinc-400 flex-1 text-center">
              main.js - CodeCraft
            </div>
          </div>
          <div className="bg-zinc-950 p-4 font-mono text-sm overflow-hidden">
            <pre className="text-zinc-300">
              <span className="text-blue-400">function</span>{" "}
              <span className="text-green-400">fibonacci</span>(
              <span className="text-orange-300">n</span>){" "}
              <span className="text-purple-400">&#123;</span>
              {"\n"}
              {"  "}
              <span className="text-blue-400">if</span> (
              <span className="text-orange-300">n</span> &lt;={" "}
              <span className="text-yellow-400">1</span>){" "}
              <span className="text-purple-400">&#123;</span>
              {"\n"}
              {"    "}
              <span className="text-blue-400">return</span>{" "}
              <span className="text-orange-300">n</span>;{"\n"}
              {"  "}
              <span className="text-purple-400">&#125;</span>
              {"\n"}
              {"  "}
              <span className="text-blue-400">return</span>{" "}
              <span className="text-green-400">fibonacci</span>(
              <span className="text-orange-300">n</span> -{" "}
              <span className="text-yellow-400">1</span>) +{" "}
              <span className="text-green-400">fibonacci</span>(
              <span className="text-orange-300">n</span> -{" "}
              <span className="text-yellow-400">2</span>);{"\n"}
              <span className="text-purple-400">&#125;</span>
              {"\n\n"}
              <span className="text-green-300">
                // Calculate the 10th Fibonacci number
              </span>
              {"\n"}
              <span className="text-blue-400">const</span>{" "}
              <span className="text-orange-300">result</span> ={" "}
              <span className="text-green-400">fibonacci</span>(
              <span className="text-yellow-400">10</span>);{"\n"}
              <span className="text-blue-400">console</span>.
              <span className="text-green-400">log</span>(
              <span className="text-orange-300">result</span>);
              {"\n"}
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
