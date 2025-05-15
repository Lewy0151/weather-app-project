import DayCard from "../components/DayCard"

export default function WeekdayBar({ weather, setIndexFunction }) {

    return (
        <div className="container w-2/3 grid grid-cols-7 w-full">
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={0} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={1} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={2} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={3} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={4} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={5} />
            <DayCard weather={weather} setIndexFunction={setIndexFunction} day={6} />
        </div>
    );
}