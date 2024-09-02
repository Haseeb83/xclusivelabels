
import { Button } from "@client/components/ui/button";
import { app } from "@client/config/app";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";

import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { EyeIcon, FileDown, LifeBuoy } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";


const TableMenu = ({ row }: { row: Row<any> }) => {
	const queryClient = useQueryClient();

	const [_refund, setRefund] = React.useState(false);
	const { button: _RefundSubmitButton, setIsLoading } = useLoading({
		label: "Refund The Label",
		async click() {
			setIsLoading(true);

			const req = await api.url("/user/labels/batch/refund").useAuth().post({ batch_uuid: row.original.uuid });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast();
				setIsLoading(false);
				setRefund(false);
				queryClient.invalidateQueries({ queryKey: ["batches", row.original.uuid] });
				return;
			}

			api.showErrorToast();
			setIsLoading(false);
			setRefund(false);
		},
	});
	const downloadSinglePDF = async () => {
		console.log("downloadSinglePDF");
		console.log(row.original);
		const doc = new jsPDF();

		// Add company logo if available
		// const logo = "img/logo.png";
		// doc.addImage(logo, "PNG", 10, 10, 50, 20);

		// Add title below the logo
		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		doc.text("Transaction Details", 70, 25);

		// Add company information in the header
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");
		doc.text(`Company name: ${app.name}`, 10, 35);
		doc.text(`Support email: ${app.support}`, 10, 45);

		// Add a horizontal line below the header
		doc.setLineWidth(0.5);
		doc.line(10, 55, 200, 55);

		// Prepare the data for the table
		const data = [
			["Email", row.original.user_email],
			["Name", row.original.user_name],
			["Credit", row.original.credit],
			["Current Balance", `$ ${row.original.current_balance}`],
			["New Balance", `$ ${row.original.new_balance}`],
			["Status", row.original.status],
			["Type", row.original.gateway],
		];

		// @ts-ignore
		doc.autoTable({
			startY: 60,
			// head: [["Field", "Value"]],
			body: data.map(([field, value]) => [field, String(value)]),
			theme: "striped",
			headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
			styles: {
				cellPadding: 2,
				fontSize: 10,
				valign: 'middle',
			},
			columnStyles: {
				0: { cellWidth: 40, fontStyle: 'bold' },
				1: { cellWidth: 150 },
			},
		});

		// Add footer
		// @ts-ignore
		const pageCount = doc.internal.getNumberOfPages();
		for (let i = 1; i <= pageCount; i++) {
			doc.setPage(i);
			// Footer with page number
			doc.setFontSize(10);
			doc.setTextColor(150);
			doc.text(app.name, 10, doc.internal.pageSize.height - 10);
			doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
		}

		// Save the PDF
		doc.save(`${row.original.uuid}.pdf`);
	};

	return (


		<div className="flex gap-2">
			<Button
				variant="outline"
				size="icon"
				disabled={row.original.is_downloaded === false}
				onClick={downloadSinglePDF}>
				<FileDown />
			</Button>
			<Link to={`/tickets/new?type=label&id=${row.original.uuid}`}>
				<Button variant="outline" size="icon">
					<LifeBuoy />
				</Button>
			</Link>

			<Button variant="outline" size="icon" disabled>
				<EyeIcon />
			</Button>
		</div>


	);
};

export default TableMenu;
