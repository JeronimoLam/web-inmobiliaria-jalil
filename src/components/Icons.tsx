import { MapPin, Phone, Mail, Clock3, Facebook, BedDouble, Grid2x2Plus, Bath } from "lucide-react";

type IconProps = {
	className?: string;
	width?: number | string;
	height?: number | string;
};

export const MapPinIcon = ({ className, width, height, ...props }: IconProps) => (
	<MapPin className={className} width={width} height={height} {...props} />
);

export const PhoneIcon = ({ className, width, height, ...props }: IconProps) => (
	<Phone className={className} width={width} height={height} {...props} />
);

export const MailIcon = ({ className, width, height, ...props }: IconProps) => (
	<Mail className={className} width={width} height={height} {...props} />
);

export const Clock3Icon = ({ className, width, height, ...props }: IconProps) => (
	<Clock3 className={className} width={width} height={height} {...props} />
);

export const FacebookIcon = ({ className, width, height, ...props }: IconProps) => (
	<Facebook className={className} width={width} height={height} {...props} />
);

export const BedDoubleIcon = ({ className, width, height, ...props }: IconProps) => (
	<BedDouble className={className} width={width} height={height} {...props} />
);

export const Grid2x2PlusIcon = ({ className, width, height, ...props }: IconProps) => (
	<Grid2x2Plus className={className} width={width} height={height} {...props} />
);

export const BathIcon = ({ className, width, height, ...props }: IconProps) => (
	<Bath className={className} width={width} height={height} {...props} />
);
