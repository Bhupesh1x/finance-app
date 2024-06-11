import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center">
        <Image src="/logo.svg" height={28} width={28} alt="logo" />
        <p className="text-2xl font-semibold text-white ml-2.5">Finance</p>
      </div>
    </Link>
  );
};
