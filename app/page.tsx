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
          <p className="text-muted">Click "Login with Google" in the navigation bar.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
    </main>
  );
}
