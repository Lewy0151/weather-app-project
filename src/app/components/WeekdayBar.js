import DayCard from "./DayCard"

export default function WeekdayBar({ weather, setIndexFunction, selectedIndex }) {

    return (
        <div className="container w-2/3 grid grid-cols-7 transition-opacity duration-300 w-full items-center">
            <DayCard weather={weather[0]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={0} />
            <DayCard weather={weather[1]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={1} />
            <DayCard weather={weather[2]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={2} />
            <DayCard weather={weather[3]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={3} />
            <DayCard weather={weather[4]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={4} />
            <DayCard weather={weather[5]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={5} />
            <DayCard weather={weather[6]} setIndexFunction={setIndexFunction} selectedIndex={selectedIndex} day={6} />
        </div>
    );
}