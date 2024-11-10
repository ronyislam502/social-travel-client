import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { ReactNode } from "react";

type TProps = {
  title: ReactNode;
  children: ReactNode;
  icon?: boolean;
};

const CustomPopover = ({ title, icon = false, children }: TProps) => {
  return (
    <Popover color="foreground" placement="top">
      <PopoverTrigger>
        <Button className="capitalize" isIconOnly={icon}>
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
