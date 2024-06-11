import { Header } from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </div>
  );
}

export default layout;
