const Title = ({ title, render }: { title: string; render?: React.JSX.Element }) => {
	return (
		<div className="flex flex-col lg:flex-row gap-4 justify-between">
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			<div className="flex gap-2 relative flex-col lg:flex-row">{render}</div>
		</div>
	);
};

export default Title;
