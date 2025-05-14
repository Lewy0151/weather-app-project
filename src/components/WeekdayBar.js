import DayCard from "../components/DayCard"

export default function WeekdayBar({ weather }) {

    return (
        <div className="container w-2/3 grid grid-cols-7 w-full">
            <DayCard weather={weather} day={0} />
            <DayCard weather={weather} day={1} />
            <DayCard weather={weather} day={2} />
            <DayCard weather={weather} day={3} />
            <DayCard weather={weather} day={4} />
            <DayCard weather={weather} day={5} />
            <DayCard weather={weather} day={6} />
        </div>
    );
}