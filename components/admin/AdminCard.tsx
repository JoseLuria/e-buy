import { FC, SVGProps } from "react";

interface Props {
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  quantity?: number;
  className?: string;
}

export const AdminCard: FC<Props> = ({
  title,
  icon: Icon,
  quantity,
  className,
}) => {
  return (
    <div className="bg-low-gray p-6 flex items-center gap-4">
      <Icon className={className} width={50} height={50} />
      <div className="grow flex items-center justify-between text-base font-bold uppercase">
        <p>{title}</p>
        <p className="text-2xl">{quantity ? quantity : 0}</p>
      </div>
    </div>
  );
};
