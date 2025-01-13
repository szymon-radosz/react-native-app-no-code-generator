import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { createProjectAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div>
        <h1>Add New Project</h1>

        <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
          <h1 className="text-2xl font-medium">Create New Project</h1>

          <Label htmlFor="password">Name</Label>
          <Input type="string" name="name" placeholder="Name" required />

          <SubmitButton formAction={createProjectAction}>Create</SubmitButton>
        </form>
      </div>
    </div>
  );
}
