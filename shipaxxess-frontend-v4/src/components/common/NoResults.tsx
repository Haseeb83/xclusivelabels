

const NoResults = () => (
    <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
            <img
                src="/svg/no-results.svg"
                height={200}
                width={200}
                alt="no results"
                style={{ width: 200, height: 200 }}
            />
            <span className="text-base text-muted-foreground">Nothing Found</span>
        </div>
    </div>
);

export default NoResults;
