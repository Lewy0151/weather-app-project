import DayCard from "./DayCard"

export default function WeekdayBar({ weather, setIndexFunction }) {

    return (
        <div className="container w-2/3 grid grid-cols-7 transition-opacity duration-300 w-full">
            <DayCard weather={weather[0]} setIndexFunction={setIndexFunction} day={0} />
            <DayCard weather={weather[1]} setIndexFunction={setIndexFunction} day={1} />
            <DayCard weather={weather[2]} setIndexFunction={setIndexFunction} day={2} />
            <DayCard weather={weather[3]} setIndexFunction={setIndexFunction} day={3} />
            <DayCard weather={weather[4]} setIndexFunction={setIndexFunction} day={4} />
            <DayCard weather={weather[5]} setIndexFunction={setIndexFunction} day={5} />
            <DayCard weather={weather[6]} setIndexFunction={setIndexFunction} day={6} />
        </div>
    );
}