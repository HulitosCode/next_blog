import Link from "next/link";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

const ButtonAction = () => {
    return ( 
        <div>
            <Button className="bg-blue-600 hover:bg-blue-500 mr-4">
            <Pencil />

            <Link href='/edit/id'>
                Edit
            </Link>
            </Button>
            <Button className="bg-red-600 hover:bg-red-500">
                <Trash />
                Delete
            </Button>
        </div>
     );
}
 
export default ButtonAction;