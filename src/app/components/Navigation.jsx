import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "TV Show",
    route: "/",
  },
   {
    label: "People",
    route: "/",
  }, {
    label: "More",
    route: "/",
  },
];

export function Navigation() {
  return (
    <header className=" border-black border p-3.5 bg-sky-950">
      <nav>
        <ul className="flex list-none gap-8 items-center margin-left: 0.875rem">
          <Image src="/Logo.png" width={200} height={200} alt={""} priority />
          
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route} className="text-white text-base font-bold">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
