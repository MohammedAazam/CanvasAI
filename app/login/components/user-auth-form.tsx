"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SplineIcon } from "lucide-react";
import supabase from "@/supabaseClient"; // Supabase client
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"; 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps): React.JSX.Element {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);  // To control modal visibility
  const [dialogMessage, setDialogMessage] = React.useState<string>("");
  const [dialogTitle, setDialogTitle] = React.useState<string>("");
  const router = useRouter();

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simple password validation
    if (password.length < 6) {
      setDialogTitle("Password Error");
      setDialogMessage("Password must be at least 6 characters long.");
      setDialogOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      // Check if the user exists in your custom 'users' table
      const { data: userData, error: userError } = await supabase
        .from("users") // Custom 'users' table
        .select("*")
        .eq("email", email)
        .single();

      if (userError || !userData) {
        setDialogTitle("Email Not Registered");
        setDialogMessage("This email is not registered.");
        setDialogOpen(true);
        setIsLoading(false);
        return;
      }

      // Compare the entered password with the stored password (plain text validation)
      if (userData.password_hash !== password) {
        setDialogTitle("Invalid Password");
        setDialogMessage("Invalid password. Please try again.");
        setDialogOpen(true);
        setIsLoading(false);
        return;
      }

      // Password is valid, proceed with authentication via Supabase
      const { error: authError } = await supabase.auth.signInWithOtp({
        email, // Assuming you're using OTP for authentication after password check
      });

      if (authError) {
        console.error("Authentication Error:", authError.message);
        setDialogTitle("Authentication Failed");
        setDialogMessage("Authentication failed. Please check your credentials.");
        setDialogOpen(true);
      } else {
        setDialogTitle("Success");
        setDialogMessage("Logged in successfully!");
        setDialogOpen(true);
        router.push("/"); // Redirect to home or dashboard
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      setDialogTitle("Error");
      setDialogMessage("An unexpected error occurred.");
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && <SplineIcon className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </div>
      </form>

      {/* Dialog for showing alerts */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogMessage}</DialogDescription>
     
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
         
        </DialogContent>
      </Dialog>
    </div>
  );
}
