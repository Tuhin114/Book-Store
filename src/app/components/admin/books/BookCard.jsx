import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BookCard = ({ book }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[2/3] w-full">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover"
        />
        <div
          className={cn(
            "status-badge absolute top-2 left-2",
            book.status === "draft"
              ? "status-draft"
              : book.status === "scheduled"
              ? "status-scheduled"
              : "status-live"
          )}
        >
          {book.status === "scheduled" && <Clock className="h-3 w-3" />}
          {book.status === "live" && <Check className="h-3 w-3" />}
          <span>
            {book.status === "draft"
              ? "Draft"
              : book.status === "scheduled"
              ? book.date
              : "Live"}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 text-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Schedule</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs bg-secondary rounded-full px-2 py-1">
          {book.category}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
