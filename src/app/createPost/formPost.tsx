"use client";

import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FormInputPost } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/BackButton";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit, control } = useForm<FormInputPost>();

  return (
    <>
   
    <div className="flex flex-col items-center mt-40">
    <div className="mb-4">
    <BackButton />
    </div>


      <Card className="w-[40rem]">
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Post" : "Criar Post"}</CardTitle>
          <CardDescription>Preencha todos os campos</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <Input
              type="text"
              placeholder="Título"
              {...register("title", { required: true })}
            />
            <Input
              id="picture"
              type="file"
              {...register("file", { required: true })}
            />
            <Textarea
              placeholder="Digite sua mensagem aqui."
              {...register("content", { required: true })}
            />
            <Controller
              name="tag"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="nestjs">NestJS</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              {isEditing ? "Atualizar" : "Criar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default FormPost;
