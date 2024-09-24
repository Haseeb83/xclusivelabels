import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import { recipentsColumns } from "../data/recipients";
import useTable from "@client/hooks/useTable";

const LabelsRecipentsTable = ({ recipients }: { recipients: Address.ONLYPHONEOPTIONALSCHEMA[] }) => {
	const { CardTable, ToggleColumns } = useTable({
		key: "labels_recipents",
		columns: recipentsColumns,
		data: recipients,
		loading: false,
		sort: [{ id: "index", desc: true }],
	});

	if (recipients.length <= 1) {
		return (
			<div className="flex items-center justify-center py-20 border border-dashed rounded-lg shadow cw-full">
				<p className="text-sm font-light text-muted-foreground">Imported recipients will show here</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow">
				<h1>All Recipients ({recipients.length})</h1>
				<ToggleColumns />
			</div>
			<CardTable />
		</div>
	);
};

export default LabelsRecipentsTable;
