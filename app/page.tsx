import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <h1 className="mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to access this application.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="text-center">
        <h1>Welcome, {session.user?.name}!</h1>
      </div>
    </main>
  );
}
