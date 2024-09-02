import { useBatchQuery } from "../hooks/useLabelsQuery";
import React from "react";
import { TimezoneContext } from "@client/contexts/timezone";
import { labelsColumns } from "../data/view";
import useTable from "@client/hooks/useTable";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { BadgeDollarSign, FileDown, Tags } from "lucide-react";
import { Button } from "@client/components/ui/button";
import { useParams } from "react-router-dom";
import Loading from "@client/components/common/loading";
import { app } from "@client/config/app";
import { toast } from "sonner";
import { api } from "@client/lib/api";
import { useLoading } from "@client/hooks/useLoading";
import { useQueryClient } from "@tanstack/react-query";
import AlertWrapper from "@client/components/common/alert";

const ViewBatchUserPage = () => {
	const params = useParams();

	const queryClient = useQueryClient();

	const [refund, setRefund] = React.useState(false);

	const batchQuery = useBatchQuery({ uuid: params.uuid! });

	const { timezone } = React.useContext(TimezoneContext);

	const { CardTable, ToggleColumns } = useTable({
		key: "batchs_labels",
		columns: labelsColumns(timezone, batchQuery.data?.batch.status_refund || false),
		data: batchQuery.data?.labels || [],
		loading: batchQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	const { button: RefundSubmitButton, setIsLoading } = useLoading({
		label: "Refund The Label",
		async click() {
			setIsLoading(true);

			const req = await api.url("/user/labels/batch/refund").useAuth().post({ batch_uuid: params.uuid });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast();
				setIsLoading(false);
				setRefund(false);
				queryClient.invalidateQueries({ queryKey: ["batches", params.uuid] });
				return;
			}

			api.showErrorToast();
			setIsLoading(false);
			setRefund(false);
		},
	});

	const batchDownload = async () => {
		const download = () =>
			new Promise((resolve, reject) => {
				fetch(`${app.prod_api}/user/labels/batch/download`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						uuid: params.uuid,
					}),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.blob();
					})
					.then((blob) => {
						const url = window.URL.createObjectURL(new Blob([blob]));
						const link = document.createElement("a");
						link.href = url;
						link.setAttribute("download", `${params.uuid}.pdf`);
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

	if (batchQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Labels" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title={batchQuery.data?.batch ? batchQuery.data.batch.name || "" : "Labels Hisory"}
					render={
						<>
							<ToggleColumns />
							<AlertWrapper
								description="Are you sure you want to refund this label? This action cannot be undone."
								title="Are you sure you want to refund this label?"
								action={RefundSubmitButton}
								open={refund}
								setOpen={setRefund}
								trigger={
									<Button variant="outline" className="gap-2" disabled={batchQuery.data?.batch.status_refund === true}>
										<BadgeDollarSign size={18} />
										Refund Batch
									</Button>
								}
							/>

							<Button
								variant="outline"
								className="gap-1"
								onClick={batchDownload}
								disabled={batchQuery.data?.batch.status_refund === true}>
								<FileDown size={16} />
								Batch Download
							</Button>
						</>
					}
				/>
				<Breadcrumb
					items={[
						{ title: "Batch History", link: "/orders", icon: <Tags size={16} /> },
						{ title: params.uuid!, link: `/orders/${params.uuid}` },
					]}
				/>
				<CardTable />
			</div>
		</>
	);
};

export default ViewBatchUserPage;
