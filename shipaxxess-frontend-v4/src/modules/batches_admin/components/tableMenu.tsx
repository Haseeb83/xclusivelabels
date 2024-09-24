import { Button } from "@client/components/ui/button";
import { app } from "@client/config/app";
import { LabelsSelectModel } from "@db/labels";
import { Row } from "@tanstack/react-table";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

const TableMenu = ({ row }: { row: Row<LabelsSelectModel> }) => {
	const downloadSinglePDF = async () => {
		const download = () =>
			new Promise((resolve, reject) => {
				fetch(`${app.prod_api}/admin/labels/download`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						id: row.original.id,
					}),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.blob();
					})
					.then((blob) => {
						if (row.original.remote_pdf_r2_link === null) {
							reject("No PDF found");
						}

						const url = window.URL.createObjectURL(new Blob([blob]));
						const link = document.createElement("a");
						link.href = url;
						link.setAttribute("download", row.original.remote_pdf_r2_link!);
						document.body.appendChild(link);
						link.click();
						link.parentNode?.removeChild(link);
						resolve(true);
					})
					.catch((error) => {
						reject(error);
					});
			});

		toast.promise(download, {
			loading: "Downloading PDF...",
			success: "PDF Downloaded!",
			error: "PDF Download Failed!",
		});
	};

	return (
		<div>
			<Button size="icon" variant="outline" onClick={downloadSinglePDF}>
				<FileDown />
			</Button>
		</div>
	);
};

export default TableMenu;
