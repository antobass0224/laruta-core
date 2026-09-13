import { prisma } from "../lib/prisma";

export default async function Home() {
  // Le pedimos a Prisma que busque el primer club registrado
  const club = await prisma.club.findFirst();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-10">
      <h1 className="text-5xl font-bold text-orange-500 uppercase tracking-widest">
        {club ? club.name : "Cargando Motor..."}
      </h1>
      <p className="mt-4 text-xl text-zinc-400">
        Plataforma Core Multi-Tenant para Clubes de Motociclismo
      </p>
    </main>
  );
}