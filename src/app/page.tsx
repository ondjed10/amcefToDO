import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-400 pl-60 pr-60 text-5xl">
      <h1 className="text-white text-center">Ondrej Jedinák AMCEF TODO list assignment</h1>
      
      <p className="text-white text-2xl text-center pt-9">
        This is my implementation of a case study which is part of job interview at AMCEF.
        You can click <Link href="/todo" className="text-purple-500">here</Link>, which will lead you to actual app itself.
        If you are curios about documentation of making this project please click <Link href="/docs" className="text-purple-500">here</Link>.

      </p>
    </div>
  );
}

