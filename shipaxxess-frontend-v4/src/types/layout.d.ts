export type SidebarProps = {
	icon: React.JSX.Element;
	label: string;
	slug: string;
	badge?: string;
};

export type HeaderProps = {
	label: string;
	slug: string;
	icon: React.JSX.Element;
};

export type NotificationProps = {
	box_color:string;
	read: boolean;
	title: string;
	description: string;
	created_at: string;
};