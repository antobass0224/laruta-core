import { prisma } from "../../lib/prisma";
import { notFound } from "next/navigation";

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const club = await prisma.club.findUnique({
    where: { slug: normalizedSlug },
    include: { riders: true },
  });

  if (!club) {
    notFound();
  }

  const bloodTypeMap: Record<string, string> = {
    A_PLUS: "A+", A_MINUS: "A-", B_PLUS: "B+", B_MINUS: "B-", 
    AB_PLUS: "AB+", AB_MINUS: "AB-", O_PLUS: "O+", O_MINUS: "O-"
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-zinc-950 text-white">
      <div className="w-full max-w-4xl border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold text-orange-500 uppercase tracking-wider">
          {club.name}
        </h1>
        <p className="text-zinc-400 mt-2">
          Portal exclusivo del club ({club.slug})
        </p>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Pilotos Registrados</h2>
        
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
                    {rider.bloodGroup ? bloodTypeMap[rider.bloodGroup] : "N/A"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-500 col-span-2">Aún no hay pilotos registrados en este club.</p>
          )}
        </div>
      </div>
    </main>
  );
}