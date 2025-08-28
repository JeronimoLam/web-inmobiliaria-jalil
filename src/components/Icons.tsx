import { MapPin, Phone, Mail, Clock3, Facebook } from "lucide-react";

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
