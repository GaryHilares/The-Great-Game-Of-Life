function TimeCounterView({ seconds }: { seconds: number | null }) {
    return (
        <div>
            <p>Time until next update: {seconds ? seconds : 0}</p>
        </div>
    );
}

export { TimeCounterView };
