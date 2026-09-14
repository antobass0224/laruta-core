import { prisma } from "@/lib/prisma";

export default async function Home() {
  const clubs = await prisma.club.findMany({
    include: {
      riders: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-zinc-950 text-white">
      <div className="w-full max-w-4xl border-b border-zinc-800 pb-6 text-center">
        <h1 className="text-4xl font-bold text-orange-500 uppercase tracking-wider">
          La Ruta
        </h1>
        <p className="text-zinc-400 mt-2">
          Portal Oficial de Clubes y Pilotos
        </p>
      </div>

      <div className="w-full max-w-4xl mt-8">
        {clubs.length === 0 ? (
          <p className="text-zinc-500 text-center mt-10">Aún no hay datos en la base de datos.</p>
        ) : (
          clubs.map((club) => (
            <div key={club.id} className="mb-10">
              <h2 className="text-2xl font-semibold text-zinc-200 mb-4 border-l-4 border-orange-500 pl-3">
                {club.name} <span className="text-sm text-zinc-500 font-normal">({club.slug})</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.riders.length > 0 ? (
                  club.riders.map((rider) => (
                    <div 
                      key={rider.id} 
                      className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {rider.firstName} {rider.lastName}
                          {rider.nickname && (
                            <span className="text-orange-400 font-normal ml-2">
                              &ldquo;{rider.nickname}&rdquo;
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-zinc-400">{rider.email}</p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                          Grupo S.O.S.
                        </span>
                        <span className="px-2.5 py-1 bg-red-950/60 border border-red-800/50 text-red-400 text-xs font-bold rounded">
                          {rider.bloodGroup || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500">Este club aún no tiene pilotos vinculados.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}