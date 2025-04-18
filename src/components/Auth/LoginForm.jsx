
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

function LoginForm({ onSuccess, onToggleForm }) {
  const { login } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    try {
      // In a real app, this would make an API call
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === data.email && u.password === data.password);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      login(user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
}

export default LoginForm;
