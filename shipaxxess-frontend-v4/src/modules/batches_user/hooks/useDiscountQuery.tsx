import { api } from "@client/lib/api";
import { CouponsSelectModel } from "@db/coupons";
import { DiscountSelectModel } from "@db/discount";
import { useQuery } from "@tanstack/react-query";

export const useDiscountsQuery = () => {
    return useQuery({
        queryKey: ["discounts"],
        queryFn: async () => {
            const req = await api.url("/user/discounts").useAuth().get();
            return await req.json<DiscountSelectModel[]>();
        },
    });
};
export const useCouponQuery = (code: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const req = await api.url(`/user/couponsByCode/${code}`).useAuth().get();
            return await req.json<CouponsSelectModel[]>();
        },
        enabled
    });
};