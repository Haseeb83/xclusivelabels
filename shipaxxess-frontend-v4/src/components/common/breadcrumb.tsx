import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbProps = { title: string; link?: string; icon?: React.JSX.Element }[];

const Breadcrumb = ({ items }: { items: BreadcrumbProps }) => {
	return (
		<div className="flex items-center">
			{items.map((nod, key) => {
				return (
					<div key={key} className="flex items-center">
						<div className="mr-1">{nod.icon}</div>
						<Link to={nod.link ? nod.link : ""} className="inline-flex text-base hover:underline text-primary/70">
							{nod.title}
						</Link>
						{items.length !== key + 1 && (
							<span className="mx-2">
								<ChevronRight size={14} />
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Breadcrumb;
