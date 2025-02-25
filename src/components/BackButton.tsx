"use client";

import { Button } from "./ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-blue-600 hover:bg-blue-500"
      onClick={() => router.back()}
    >
      <ChevronLeftCircle />
      Voltar
    </Button>
  );
};

export default BackButton;
