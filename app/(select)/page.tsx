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
      <div className="flex gap-4 justify-between flex-col sm:flex-row">
        <Link href={"/scan"} className="w-full h-full">
          <Card className="hover:shadow-md duration-500 dark:hover:bg-[#00378f]">
            <CardHeader>
              <CardTitle>Enter from Image</CardTitle>
              <CardDescription>
                Scan your luggage to find out what can fly!
              </CardDescription>
            </CardHeader>
            {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            <CardFooter className="flex justify-center items-center">
              <img
                src="/images/scan emote.png"
                alt="Scan Emote"
                className="w-28 h-28"
              />
            </CardFooter>
          </Card>
        </Link>
        <Link href={"/list"} className="w-full h-full">
          <Card className="hover:shadow-md duration-500 dark:hover:bg-[#00378f]">
            <CardHeader>
              <CardTitle>Enter from List</CardTitle>
              <CardDescription>
                No pictures? No problem!
                <br />
                Type out your packed items below.
              </CardDescription>
            </CardHeader>
            {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            <CardFooter className="flex justify-center items-center">
              <img
                src="/images/text query.png"
                alt="Scan Emote"
                className="w-28 h-28"
              />
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
