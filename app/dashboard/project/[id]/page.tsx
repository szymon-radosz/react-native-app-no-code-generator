import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project?.name}</h2>
      <p>Created At: {new Date(project?.created_at).toLocaleString()}</p>
      <p>Owner ID: {project?.user_id}</p>
    </div>
  );
}
