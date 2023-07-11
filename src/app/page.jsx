import { NowPlaying } from "./components/Nowplaying";

export default  function Homepage({ params }) {
  return (
    <section > 
      <div className="my-6">
        <NowPlaying id={"now_playing"} />
        <NowPlaying id={"popular"} />
        <NowPlaying id={"top_rated"} />
        <NowPlaying id={"upcoming"} />
      </div>
   
    </section>
  );
}
