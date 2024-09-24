const SVGsiteLogo = (rest: React.SVGAttributes<SVGSVGElement>) => {
	return (
		<svg
			className="h-6 w-6"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#fff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...rest}>
			<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
		</svg>
	);
};

export default SVGsiteLogo;
