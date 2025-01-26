import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-[100vh] justify-center items-center">
      <div className="flex gap-4 justify-between">
        <Link href={"/scan"} className="w-full h-full">
          <Card className="hover:shadow-md druration-500">
            <CardHeader>
              <CardTitle>Enter from Image</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
        <Link href={"/list"} className="w-full h-full">
          <Card className="hover:shadow-md druration-500">
            <CardHeader>
              <CardTitle>Enter from List</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
