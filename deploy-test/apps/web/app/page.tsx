import { client } from "@repo/db/client";

export default async function Home() {
  const users = await client.user.findMany();
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {user.name}: ({user.username})
          </div>
        );
      })}
    </div>
  );
}
