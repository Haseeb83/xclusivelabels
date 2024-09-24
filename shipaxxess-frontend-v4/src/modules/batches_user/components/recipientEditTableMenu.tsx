import { Button } from "@client/components/ui/button";
import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";

const RecipientEditTableMenu = ({ row }: { row: Row<Address.ONLYPHONEOPTIONALSCHEMA> }) => {
	return (
		<>
			<Button
				key={row.id}
				type="button"
				variant="ghost"
				className="justify-start w-full gap-2 px-2"
				size="icon"
				disabled>
				<Edit size={16} />
			</Button>
		</>
	);
};

export default RecipientEditTableMenu;
